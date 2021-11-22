function TrieNode() {
  this.value = null;
  this.end = false;
  this.children = {};
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.insert = this.insert.bind(this);
    this.find = this.find.bind(this);
  }

  insert(word) {
    let currentNode = this.root;

    for (let c = 0; c < word.length; c++) {
      const key = word[c];
      currentNode.children[key] = currentNode.children[key] || new TrieNode();
      currentNode = currentNode.children[key];
    }
    currentNode.value = word;
    currentNode.end = true;
  }

  find(keyword) {
    if (keyword.length === 0) {
      return [];
    }

    let currentNode = this.root;
    for (let c = 0; c < keyword.length; c++) {
      const key = keyword[c];
      if (!(key in currentNode.children)) {
        return [];
      }
      currentNode = currentNode.children[key];
    }

    const result = currentNode.end ? [currentNode.value] : [];
    const childrens = Object.values(currentNode.children);
    while (childrens.length !== 0) {
      const child = childrens.shift();
      childrens.push(...Object.values(child.children));
      if (child.end) {
        result.push(child.value);
      }
    }
    return result.sort().length > 10 ? result.slice(0, 10) : result;
  }
}

export default Trie;
