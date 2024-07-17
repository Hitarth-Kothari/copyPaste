document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save');
    const keyInput = document.getElementById('key');
    const snippetInput = document.getElementById('snippet');
    const snippetsContainer = document.getElementById('snippets');
  
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
      snippetElement.className = 'flex justify-between items-center bg-white p-2 mb-2 border border-gray-300 rounded shadow';
  
      const textElement = document.createElement('span');
      textElement.textContent = key;
      textElement.className = 'flex-grow';
  
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'flex gap-2';
  
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.className = 'bg-green-500 text-white px-2 py-1 rounded';
      copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(snippet);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded';
      deleteButton.addEventListener('click', function() {
        chrome.storage.local.get(['snippets'], function(result) {
          const snippets = result.snippets || {};
          delete snippets[key];
          chrome.storage.local.set({ snippets }, function() {
            snippetsContainer.removeChild(snippetElement);
          });
        });
      });
  
      buttonContainer.appendChild(copyButton);
      buttonContainer.appendChild(deleteButton);
      snippetElement.appendChild(textElement);
      snippetElement.appendChild(buttonContainer);
      snippetsContainer.appendChild(snippetElement);
    }
  });
  