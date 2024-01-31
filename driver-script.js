import {Tree} from './index.js'

// Returns an array of random numbers in [min, max)
function produceRandomNums(size, min, max) {
    let result = Array(size);

    if (min > max) {
        let tempMin = min;
        min = max;
        max = tempMin;
    }

    for (let i = 0; i < size; i++) {
        result[i] = Math.floor(Math.random() * (max - min) + min);
    }

    return result;
}


// Create a binary search tree from an array of random numbers < 100
let balancedBST = new Tree(produceRandomNums(20, 0, 100));

console.log("Here's what the BST looks like initially: \n");
balancedBST.prettyPrint();

// Confirm that the tree is balanced by calling isBalanced.
console.log("This tree is balanced? " + balancedBST.isBalanced(balancedBST.root) + '\n');

// Print out all elements in level, pre, post, and in order.
console.log("Here's a level-order traversal:");
balancedBST.levelOrderIterative((value) => console.log(value));
console.log("Here's a pre-order traversal:");
balancedBST.preOrder((value) => console.log(value));
console.log("Here's a in-order traversal:");
balancedBST.inOrder((value) => console.log(value));
console.log("Here's a post-order traversal:");
balancedBST.postOrder((value) => console.log(value));

// Unbalance the tree by adding several numbers > 100.
let largeValues = produceRandomNums(5, 100, 200);
largeValues.map(value => balancedBST.insert(value));

console.log("Here's what the BST looks like after we insert a bunch of large values: \n")
balancedBST.prettyPrint();
console.log("This tree is balanced? " + balancedBST.isBalanced(balancedBST.root) + '\n');

console.log("Here's what the tree looks like after balancing the tree: \n");
balancedBST.rebalance(balancedBST.root);
balancedBST.prettyPrint();
console.log("This tree is balanced? " + balancedBST.isBalanced(balancedBST.root) + '\n');

// Print out all elements in level, pre, post, and in order again.
console.log("Here's a level-order traversal:");
balancedBST.levelOrderIterative((value) => console.log(value));
console.log("Here's a pre-order traversal:");
balancedBST.preOrder((value) => console.log(value));
console.log("Here's a in-order traversal:");
balancedBST.inOrder((value) => console.log(value));
console.log("Here's a post-order traversal:");
balancedBST.postOrder((value) => console.log(value));