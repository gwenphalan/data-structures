/**
 * @class Tree
 * @classdesc A tree data structure. A tree is a data structure that consists of nodes in a parent/child relationship. Each node can only have one parent, but can have multiple children.
 *
 * @template T The type of data to store in the tree.
 *
 * @property {Tree[]} children - The children of the tree.
 * @property {T} value - The value of the tree.
 *
 * @constructor
 * @param {T} value - The value of the tree.
 * @param {Tree[]} children - The children of the tree.
 *
 * @function add - Adds a value to the tree.
 * @function toString - Returns a string representation of the tree.
 */
export class Tree<T> {
    value: T;
    children: (Tree<T> | null)[];

    /**
     *
     * @param value The value of the tree.
     * @param children Any children of the tree.
     */
    constructor(value: T, children: Tree<T>[] = []) {
        if (value === undefined) throw new Error('The value of a tree cannot be undefined.');
        this.value = value;
        this.children = children;
    }

    /**
     * Adds a value to the tree.
     * @param {T} value
     */
    add(value: T): void {
        this.children.push(new Tree(value));
    }

    /**
     * @param predicate
     * @returns The first node that matches the predicate, or null if no node matches the predicate. A predicate is a function that takes a value and returns a boolean based on the predicate function's logic.
     */
    search(predicate: (value: T) => boolean): T | null {
        if (predicate(this.value)) return this.value;

        for (let child of this.children) {
            if (child === null) continue;

            let result = child.search(predicate);
            if (result !== null) return result;
        }

        return null;
    }

    /**
     *
     * @returns The height of the tree. The height of a tree is the number of edges on the longest path from the root to a leaf.
     */
    height(): number {
        if (this.children.length === 0) return 0;

        let heights = this.children.map(child => child?.height() ?? 0);
        return Math.max(...heights) + 1;
    }

    /**
     * Inverts the tree. Inverting a tree means that node's children are reversed in order.
     */
    invert(): void {
        this.children.reverse();
        this.children.forEach(child => child?.invert());
    }

    /**
     * Returns a string representation of the tree.
     *
     * @example
     * let tree = new Tree(5);
     * tree.add(3);
     * tree.add(7);
     * tree.add(2);
     * tree.add(4);
     * tree.children[0].add(1);
     * tree.children[0].add(6);
     * tree.children[1].add(8);
     *
     * console.log(tree.toString());
     * // 5
     * // ├─3
     * // │ ├─1
     * // │ ├─6
     * // │ └─8
     * // ├─7
     * // └─2
     * @returns {string}
     */
    toString(predicate?: (value: T) => string): string {
        let value = predicate ? predicate(this.value) : this.value;
        let output = `${value}`;

        // Create an array with all children that are not null
        let children = this.children.filter(child => child !== null);

        if (children.length == 0) return output;

        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child === null) continue;

            let childOutput = child.toString();

            let lastChild = i == children.length - 1;

            let valuePrefix = lastChild ? '└─' : '├─';
            let childPrefix = lastChild ? '  ' : '│ ';

            // Add valuePrefix to the first line of childOutput, and if lastChild is false, add childPrefix to the rest of the lines
            childOutput = `${valuePrefix}${childOutput.replace(/\n/g, `\n${childPrefix}`)}`;

            output += `\n${childOutput}`;
        }

        return output;
    }
}
