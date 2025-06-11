import { Node } from "./Node";

export class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    // Recursively builds a balanced BST
    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }
}