function replaceInElement(element) {
  // Replace in this element's direct text nodes
  element.childNodes.forEach(node => {
    if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('cinezo')) {
      node.nodeValue = "Jpavtv";
    }
  });
  // Recursively replace in children
  Array.from(element.children).forEach(replaceInElement);
}

// Replace in all elements at startup
replaceInElement(document.body);

// Optional: Set up MutationObserver to handle dynamic changes
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element
          replaceInElement(node);
        }
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
