export const LANGUAGE_VERSIONS = {
    "javascript": "1.32.3",
    "java": "15.0.2",   
    "c++": "10.2.0",
    "c": "10.2.0",
    "python": "3.10.0",
}

export const LANGUAGE_BOILERPLATES = {
    java: `public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello, World!");
    }
}`,
    javascript: `// Your code here
console.log("Hello, World!");`,
    c: `#include <stdio.h>

int main() {
    // Your code here
    printf("Hello, World!\\n");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}`,
    python: `# Your code here
print("Hello, World!")`,
};
