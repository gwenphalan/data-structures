# Gwen's Data Structures

This project is an excercise to understand and explore different data structures and how they can be utilized.

### Data Structures

-   Tree
-   BinaryTree (Extends Tree)

I will add more data structures in the future (not including the ones already in javascript).

# Example Usages

## Tree

```ts
class Person {
    firstName: string;
    middleName: string | null = null;
    lastName: string;
    age: number;
    gender: boolean | null = null;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    toString() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Family extends Tree<Person> {
    mother: Person;
    father: Person;

    constructor(mother: Person, father: Person, children: Tree<Person>[] = []) {
        super(mother, children);
        this.mother = mother;
        this.father = father;
    }

    add(child: Person): void {
        this.children.push(new Tree(child));
    }

    toString(): string {
        return `${this.father.toString()}\n| \n${super.toString(c => c.toString())}`;
    }
}

let family = new Family(new Person('Jane', 'Doe', 30), new Person('John', 'Doe', 32));

family.add(new Person('Alice', 'Doe', 5));
family.add(new Person('Bob', 'Doe', 3));

console.log(family.toString());
// John Doe
// |
// Jane Doe
// ├─Alice Doe
// └─Bob Doe
```

<sup>[Source](https://github.com/gwenphalan/data-structures/blob/main/src/example.ts)</sup>
