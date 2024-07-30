document.addEventListener('DOMContentLoaded', function() {
  const saveButton = document.getElementById('save');
  const keyInput = document.getElementById('key');
  const snippetInput = document.getElementById('snippet');
  const snippetsContainer = document.getElementById('snippets');
  const toggleInputs = document.getElementById('toggle-inputs');
  const inputContainer = document.getElementById('input-container');
  const customCheckbox = document.getElementById('custom-checkbox');
  
  // Toggle input fields visibility and checkbox style
  toggleInputs.addEventListener('change', function() {
    inputContainer.classList.toggle('hidden', !this.checked);
    customCheckbox.classList.toggle('bg-green-500', this.checked);
    customCheckbox.classList.toggle('bg-gray-600', !this.checked);
  });

  // Load saved snippets
  chrome.storage.local.get(['snippets'], function(result) {
    const snippets = result.snippets || {};
    Object.keys(snippets).forEach(key => addSnippetToDOM(key, snippets[key]));
  });

  // Save snippet
  saveButton.addEventListener('click', function() {
    const key = keyInput.value.trim();
    const snippet = snippetInput.value.trim();
    if (key && snippet) {
      chrome.storage.local.get(['snippets'], function(result) {
        const snippets = result.snippets || {};
        snippets[key] = snippet;
        chrome.storage.local.set({ snippets }, function() {
          addSnippetToDOM(key, snippet);
          keyInput.value = '';
          snippetInput.value = '';
        });
      });
    }
  });

  // Add snippet to DOM
  function addSnippetToDOM(key, snippet) {
    const snippetElement = document.createElement('div');
    snippetElement.className = 'snippet-item flex justify-between items-center bg-gray-800 text-white p-2 mb-2 border border-gray-600 rounded-lg shadow relative';

    const textElement = document.createElement('span');
    textElement.textContent = key;
    textElement.className = 'flex-grow';

    const deleteStrip = document.createElement('div');
    deleteStrip.className = 'absolute top-0 right-0 h-full w-2 bg-red-600 hover:bg-red-700 cursor-pointer rounded-r-2xl';
    deleteStrip.addEventListener('click', function(event) {
      event.stopPropagation();  // Prevent any other click event
      chrome.storage.local.get(['snippets'], function(result) {
        const snippets = result.snippets || {};
        delete snippets[key];
        chrome.storage.local.set({ snippets }, function() {
          snippetsContainer.removeChild(snippetElement);
        });
      });
    });

    snippetElement.appendChild(textElement);
    snippetElement.appendChild(deleteStrip);

    // Copy snippet on container click
    snippetElement.addEventListener('click', function() {
      navigator.clipboard.writeText(snippet);
    });

    snippetsContainer.appendChild(snippetElement);
  }
});
