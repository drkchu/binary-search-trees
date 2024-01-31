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

        if (!this.isBalanced(this.root))
            this.rebalance(this.root);
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
        if (!this.isBalanced(this.root))
            this.rebalance(this.root);
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

        return root; // Gotta return the root so that we can use it recursively
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

    // Finds the node with the next largest value, assuming that the given root has a right child
    findSuccessor(root) {
        let rightSubtree = root.right;
        while (rightSubtree.left) {
            rightSubtree = rightSubtree.left;
        }
        return rightSubtree;
    }

    // Returns the node with the given value, null otherwise
    find(value) {
        let currRoot = this.root;
        while (currRoot !== null) {
            if (currRoot.data === value)
                return currRoot;
            else if (currRoot.data < value)
                currRoot = currRoot.right;
            else
                currRoot = currRoot.left;
        }
        return null;
    }

    // Produce a level-order traversal, using the callback function if defined or just returning an array of values otherwise
    levelOrderIterative(callback = null) {
        let queue = [];
        let result = [];
        let currRoot = this.root;

        if (currRoot !== null) {
            queue.push(currRoot);
    
            while (queue.length !== 0) {
                currRoot = queue.shift();
                result.push(currRoot.data);
    
                if (currRoot.left) 
                    queue.push(currRoot.left);
                if (currRoot.right) 
                    queue.push(currRoot.right);
            }
        }

        if (callback !== null)
            result.map(callback);
        
        return result;
    }

    levelOrderRecursive(callback) {
        let result = [];
        for (let level = 0; level <= this.height(tree.root); level++)
            this.processNodesAtLevel(this.root, level, callback);
        
        if (callback === null)
            return result;
    }

    processNodesAtLevel(root, level, callback) {
        if (root === null)
            return;

        if (level === 0) {
            if (callback !== null)
                callback(root.data);
        }

        this.processNodesAtLevel(root.left, level - 1, callback);
        this.processNodesAtLevel(root.right, level - 1, callback);
    }

    preOrder(callback = null) {
        const result = this.preOrderRecursiveHelper(this.root, callback);
        
        if (callback)
            result.map(callback);
        else    
            return result;
    }
    
    preOrderRecursiveHelper(root) {
        let result = [];

        if (root === null)
            return [];

        result.push(root.data);
        result = result.concat(this.preOrderRecursiveHelper(root.left));
        result = result.concat(this.preOrderRecursiveHelper(root.right));
        
        return result;
    }

    inOrder(callback = null) {
        const result = this.inOrderRecursiveHelper(this.root, callback);
        
        if (callback)
            result.map(callback);
        else    
            return result;
    }

    inOrderRecursiveHelper(root) {
        let result = [];

        if (root === null)
            return [];

        result = result.concat(this.inOrderRecursiveHelper(root.left));
        result.push(root.data);
        result = result.concat(this.inOrderRecursiveHelper(root.right));
        
        return result;
    }

    postOrder(callback = null) {
        const result = this.postOrderRecursiveHelper(this.root, callback);
        
        if (callback)
            result.map(callback);
        else    
            return result;
    }
    
    postOrderRecursiveHelper(root) {
        let result = [];

        if (root === null)
            return [];

        result = result.concat(this.postOrderRecursiveHelper(root.left));
        result = result.concat(this.postOrderRecursiveHelper(root.right));
        result.push(root.data);
        
        return result;
    }

    // Returns the height of a given node
    height(node) {
        if (node === null)
            return -1;
        
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node) {
        if (node === null)
            return -1;

        return this.height(this.root) - this.height(node);
    }

    isBalanced(node) {
        if (node === null)
            return true;

        let leftSubtreeHeight = this.height(node.left);
        let rightSubtreeHeight = this.height(node.right);

        return Math.abs(leftSubtreeHeight - rightSubtreeHeight) <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    // Done by creating a new array, alternatively I couldn't used rotations similar to how an AVL tree operates
    rebalance(node) {
        let totalItems = this.inOrder();
        this.root = this.buildTree(totalItems, 0, totalItems.length - 1)
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

tree.levelOrderIterative((value) => console.log(value));

console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')

tree.levelOrderRecursive((value) => console.log(value));

console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')

prettyPrint(tree.root);