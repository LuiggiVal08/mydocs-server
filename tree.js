const fs = require('fs');
const path = require('path');

// Función recursiva para recorrer directorios y subdirectorios
const dirTree = (dirPath) => {
    try {
        const files = fs.readdirSync(dirPath); // Lee los archivos y directorios del directorio actual
        const stats = files.map((file) => {
            const fullPath = path.join(dirPath, file); // Obtiene la ruta completa del archivo o directorio
            const stat = fs.statSync(fullPath); // Obtiene información sobre si es un archivo o directorio

            if (stat.isDirectory()) {
                return {
                    name: file,
                    children: dirTree(fullPath), // Si es un directorio, se llama recursivamente
                };
            } else {
                return { name: file }; // Si es un archivo, solo devuelve el nombre
            }
        });
        return stats;
    } catch (error) {
        console.error(`Error al leer el directorio ${dirPath}: ${error.message}`);
        return []; // Devuelve un array vacío en caso de error
    }
};

// Función para imprimir el árbol en un formato visual
const printTree = (tree, prefix = '') => {
    tree.forEach((node, index) => {
        const isLast = index === tree.length - 1; // Verifica si es el último elemento para modificar el prefijo
        const connector = isLast ? '└── ' : '├── '; // Cambia el conector entre elementos
        console.log(`${prefix}${connector}${node.name}`);
        if (node.children) {
            // Si el nodo tiene hijos, se llama recursivamente para imprimirlos
            printTree(node.children, prefix + (isLast ? '    ' : '│   '));
        }
    });
};

// Ruta del directorio raíz a analizar (puedes cambiarla a la ruta que desees)
const rootDir = process.argv[2] || './'; // Permite pasar la ruta como argumento o usar './' por defecto

const tree = dirTree(rootDir); // Obtiene el árbol de directorios
printTree(tree); // Imprime el árbol
