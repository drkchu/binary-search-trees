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

    // Insert a value in to BST
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
        // !!! Check if the tree is unbalanced, if so, balance it 
    }

    deleteItemRecHelper(root, value) {
        if (root === null)
            return null;

        if (root.data === value)
            return this.removeNodeHelper(root);
        else if (root.data < value)
            root.right = this.deleteItemRecHelper(root.right, value);
        else 
            root.left = this.deleteItemRecHelper(root.left, value);

        return root;
    }

    removeNodeHelper(root) {
        if (root.right && root.left) { // This node has both children, choose successor as the replacement
            const successor = this.findSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteItemRecHelper(root.right, successor.data); // If the node we wanna remove has both children, choose a successor and change the node's values to the successor's value, then remove the successor from the right subtree
            return root;
        } else {
            const toReplaceRoot = root.right || root.left;
            root = null;
            return toReplaceRoot;
        }
    }

    findSuccessor(root) {
        let rightSubtree = root.right;
        while (rightSubtree.left) {
            rightSubtree = rightSubtree.left;
        }
        return rightSubtree;
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

prettyPrint(tree.root);

console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')

tree.deleteItem(8);

prettyPrint(tree.root);

tree.deleteItem(9);

prettyPrint(tree.root);

tree.deleteItem(23);

prettyPrint(tree.root);