# Balanced Binary Search Trees
- The asymptotic bounds for a BST are dependent on the height 
    - Since we can ensure that the BST remains balanced, we have $\ O(\log(n)) $ bounds for deletion, search and $\ O(n) $ for traversals
- An efficient way to ensure a balanced BST would be to use the AVL implementation which involves rotating unbalanced subtress starting from the base of the tree
- In this case, I'm using a simpler but less efficient method of rebalancing a tree by basically calling the constructor again with the current values, this will be $\ O(n\log(n)) $ since we need to sort the values in the tree.
