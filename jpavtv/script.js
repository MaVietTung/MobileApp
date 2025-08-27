const callback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element
          replaceInElement(node);
        }
      });
    }
  }
};

function replaceInElement(element) {
  // Replace in this element's direct text nodes
  element.childNodes.forEach(node => {
    if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('movieko')) {
      node.nodeValue = node.nodeValue.replace(/movieko/gi, 'Jpavtv');
    }
  });
  // Recursively replace in children
  element.children && Array.from(element.children).forEach(replaceInElement);
}

const allElements = document.getElementsByTagName('*');
            for (let i = 0; i < allElements.length; i++) {
                const element = allElements[i];
                for (let j = 0; j < element.childNodes.length; j++) {
                    const node = element.childNodes[j];
                    if (node.nodeType === 3 && node.nodeValue.trim().toLowerCase().includes('movieko')) {
                        node.nodeValue = 'Jpavtv';
                    }
                }
            }
