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
    
    insert(value, node = this.root) {
        if (!node) return new Node(value);

        if (value === node.data) return node;

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        }
        else {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (!node) return null;

        if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
        } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        const successor = this.minValueNode(node.right);
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right);
        }

        return node;
    }
}