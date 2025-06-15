import { Tree } from "./Tree.js";
import { prettyPrint } from "./prettyPrint.js";

// Generate an array of unique random numbers
const generateRandomArray = (size = 15) => {
    return Array.from(new Set(Array.from({ length: size }, 
    () => Math.floor(Math.random() * 100))));
};
// Callback to print node data
const printNode = (node) => {
    if (node) console.log(node.data);
}

// Start
const tree = new Tree(generateRandomArray());

console.log('Initial Tree:');
prettyPrint(tree.root);

console.log('Is Balanced:', tree.isBalanced());

// Traversals
console.log('\nLevel Order:');
tree.levelOrder(printNode);
console.log('\nPre Order:');
tree.preOrder(printNode);
console.log('\nIn Order:');
tree.inOrder(printNode);
console.log('\nPost Order:');
tree.postOrder(printNode);

// Unbalance tree
[120, 130, 150, 160, 170].forEach((num) => tree.insert(num));

console.log('\nAfter Inserting Large Values:');
prettyPrint(tree.root);
console.log('Is Balanced:', tree.isBalanced());

// Rebalance
tree.rebalance();
console.log('\nAfter Rebalancing:');
prettyPrint(tree.root);
console.log('Is Balanced:', tree.isBalanced());

// Traversals Again
console.log('\nLevel Order After Rebalance:');
tree.levelOrder(printNode);