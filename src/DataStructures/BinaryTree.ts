import { Tree } from './Tree';

/**
 * @class BinaryTree
 * @classdesc A binary tree.
 * Binary trees are a type of tree that have at most two children. They are useful for storing data in a sorted manner. This class is abstract and should be extended to create a binary tree of a specific type.
 *
 * @template T The type of data to store in the binary tree.
 *
 * @property {BinaryTree} left - The left child of the binary tree.
 * @property {BinaryTree} right - The right child of the binary tree.
 * @property {any} value - The value of the binary tree.
 *
 * @function insert - Inserts a value into the binary tree.
 * @function invert - Inverts the binary tree.
 * @function maxHeight - Returns the maximum height of the binary tree.
 * @function maxNodes - Returns the maximum number of nodes in the binary tree.
 * @function toString - Returns a string representation of the binary tree.
 */
export class BinaryTree<T> extends Tree<T> {
    children: (BinaryTree<T> | null)[] = [];

    constructor(value: T, left: BinaryTree<T> | null = null, right: BinaryTree<T> | null = null) {
        super(value);
        this.children = [left, right];
    }

    get left(): BinaryTree<T> | null {
        return this.children[0];
    }

    set left(value: BinaryTree<T> | null) {
        if (value) value.parent = this;
        this.children[0] = value;
    }

    get right(): BinaryTree<T> | null {
        return this.children[1];
    }

    set right(value: BinaryTree<T> | null) {
        if (value) value.parent = this;
        this.children[1] = value;
    }

    /**
     * Inserts a value into the tree.
     * @param value
     *
     * @example
     * let tree = new BinaryTree(5);
     * tree.insert(3);
     * tree.insert(7);
     * tree.insert(2);
     *
     * console.log(tree.toString());
     * // 5
     * // ├─3
     * // │ └─2
     * // └─7
     */
    insert(value: T): void {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BinaryTree(value);
            } else {
                this.left.insert(value);
            }
        } else if (value > this.value) {
            if (this.right === null) {
                this.right = new BinaryTree(value);
            } else {
                this.right.insert(value);
            }
        }
    }

    leftMost(): BinaryTree<T> {
        if (this.left === null) return this;
        return this.left.leftMost();
    }

    rightMost(): BinaryTree<T> {
        if (this.right === null) return this;
        return this.right.rightMost();
    }

    /**
     * Add is not supported for binary trees. Use insert instead.
     */
    add(): void {
        throw new Error('BinaryTree.add is not a function. Use BinaryTree.insert instead.');
    }

    /**
     * @returns The maximum number of nodes in the binary tree. The maximum number of nodes is equal to 2^h - 1, where h is the height of the tree. Technically, this is the maximum number of nodes in a complete binary tree.
     * @example
     * let tree = new BinaryTree(5);
     * tree.insert(3);
     * tree.insert(7);
     * tree.insert(2);
     * tree.insert(4);
     * tree.insert(6);
     *
     * console.log(tree.maxNodes());
     * // 6
     */
    maxNodes(): number {
        return Math.pow(2, this.height() + 1) - 1;
    }
}
