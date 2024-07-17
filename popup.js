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
    snippetElement.className = 'flex justify-between items-center bg-gray-800 text-white p-2 mb-2 border border-gray-600 rounded-lg shadow cursor-pointer';

    const textElement = document.createElement('span');
    textElement.textContent = key;
    textElement.className = 'flex-grow';

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex gap-2';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700';
    deleteButton.addEventListener('click', function(event) {
      event.stopPropagation();  // Prevent the container click event from firing
      chrome.storage.local.get(['snippets'], function(result) {
        const snippets = result.snippets || {};
        delete snippets[key];
        chrome.storage.local.set({ snippets }, function() {
          snippetsContainer.removeChild(snippetElement);
        });
      });
    });

    snippetElement.appendChild(textElement);
    buttonContainer.appendChild(deleteButton);
    snippetElement.appendChild(buttonContainer);

    // Copy snippet on container click
    snippetElement.addEventListener('click', function() {
      navigator.clipboard.writeText(snippet);
    });

    snippetsContainer.appendChild(snippetElement);
  }
});
