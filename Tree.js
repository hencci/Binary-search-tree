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
        }
        else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        }
        else {
            if (!node.left && !node.right) return null;
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            const successor = this.minValueNode(node.right);
            node.data = successor.data;
            node.right = this.deleteItem(successor.data, node.right);
        }

        return node;
    }

    minValueNode(node) {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }
    
    find(value, node = this.root) {
        if (!node || node.data === value) return node;
    
        return value < node.data ?
        this.find(value, node.left) : this.find(value, node.right);
    }

    levelOrder(callback) {
        if (!callback || typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
    
        const queue = [this.root];
        while (queue.length) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrder(callback, node = this.root) {
        if (!callback || typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
    
        if (node.left) this.inOrder(callback, node.left);
        callback(node);
        if (node.right) this.inOrder(callback, node.right);
    }
    
    preOrder(callback, node = this.root) {
        if (!callback || typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
    
        callback(node);
        if (node.left) this.preOrder(callback, node.left);
        if (node.right) this.preOrder(callback, node.right);
    }
    
    postOrder(callback, node = this.root) {
        if (!callback || typeof callback !== 'function') {
            throw new Error('Callback function is required');
        }
    
        if (node.left) this.postOrder(callback, node.left);
        if (node.right) this.postOrder(callback, node.right);
        callback(node);
    }

    height(value) {
        const node = this.find(value);
        if (!node) return null;
    
        const getHeight = (node) => {
            if (!node) return -1;
            return 1 + Math.max(getHeight(node.left), getHeight(node.right));
        };
    
        return getHeight(node);
    }
    
    depth(value, node = this.root, currentDepth = 0) {
        if (!node) return null;
        if (value === node.data) return currentDepth;
    
        if (value < node.data) {
            return this.depth(value, node.left, currentDepth + 1);
        }
        else return this.depth(value, node.right, currentDepth + 1);
    }

    isBalanced(node = this.root) {
        const checkBalance = (node) => {
            if (!node) return 0;
        
            const left = checkBalance(node.left);
            if (left === -1) return -1;
        
            const right = checkBalance(node.right);
            if (right === -1) return -1;
        
            return Math.abs(left - right) > 1 ? -1 : 1 + Math.max(left, right);
        };
    
        return checkBalance(node) !== -1;
    }
    
    rebalance() {
        const result = [];
        this.inOrder((node) => result.push(node.data));
        this.root = this.buildTree(result);
    }
}