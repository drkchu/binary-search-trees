class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
    }

    buildTree(array, start, end) {
        if (start > end) // Base case
            return null;

        const mid = parseInt((start + end) / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    // Insert a value in to BST, doesn't bother balancing yet
    insert(value) {
        this.insertRecHelper(this.root, value);
        // !!! Check if the tree is unbalanced, if so, balance it 
    }

    insertRecHelper(root, value) {
        if (root === null) {
            root = new Node(value);
            return root;
        }

        if (root.data === value) // Since we don't want to add duplicate values
            return
        else if (root.data < value)
            root.right = this.insertRecHelper(root.right, value);
        else
            root.left = this.insertRecHelper(root.left, value);
        
        return root;
    }

    deleteItem(value) {
        this.deleteItemRecHelper(this.root, value);
    }

    deleteItemRecHelper(root, value) {
        // !!! Check if the tree is unbalanced, if so, balance it 
    }
}

// To make testing a bit easier
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

let tree2 = new Tree([1, 2, 3]);
prettyPrint(tree2.root);
tree2.insert(5);
prettyPrint(tree2.root);
tree2.insert(100);
prettyPrint(tree2.root);
