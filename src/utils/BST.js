export class Node {
    constructor(value = null, left = null, right = null, children = []) {
        this.value = value;
        this.right = right;
        this.left = left;
        this.children = children
    }

    toString() {
        return JSON.stringify(this);
    }
}

export class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    /*
     * Searches for a value in the tree and returns a node.
     */
    find(value) {
        const search = new Date(value).setHours(0,0,0,0)
        let output;
        let traverse = (node) => {
            if (node == null || node.value === search) {
                return output = node;
            } else if (search < node.value) {
                traverse(node.left);
            } else {
                traverse(node.right);
            }
        };
         traverse(this.root);
         return output
    }

    /*
     * Takes a value to insert into the tree.
     */
    insert(value, item) {
        if (this.root === null) {
            this.root = new Node(value);
            this.root.children.push(item)
        } else {
            let current = this.root;
            while (true) {

                if (value == current.value) {
                    current.children.push(item)
                    break;
                }

                if (value > current.value) {
                    if (current.right === null) {
                        current.right = new Node(value);
                        current.right.children.push(item);
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    if (current.left === null) {
                        current.left = new Node(value);
                        current.left.children.push(item);
                        break;
                    } else {
                        current = current.left;
                    }
                }
            }
        }
    }
}
