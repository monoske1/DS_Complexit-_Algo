// Génération de données pour les tests
// Génération simplifiée des artistes
const generateArtists = num => Array.from(
    { length: num },
    (_, i) => ({ id: `artist_${i}`, name: `Artist_${i}`, genre: ['Rock', 'Jazz', 'Pop', 'Metal', 'Electro'][i % 5] })
  );
  

function generateStages() {
  return [
    { id: 'stage_rock', name: 'Rock Stage', genres: ['Rock'] },
    { id: 'stage_jazz', name: 'Jazz Stage', genres: ['Jazz'] },
    { id: 'stage_pop', name: 'Pop Stage', genres: ['Pop'] },
    { id: 'stage_metal', name: 'Metal Stage', genres: ['Metal'] },
    { id: 'stage_electro', name: 'Electro Stage', genres: ['Electro'] }
  ];
}

// Optimisation de la recherche d'un artiste avec une recherche dichotomique
// Cette approche améliore la complexité de O(n) à O(log n) en supposant que la liste est triée
function findArtistIndexOptimized(artists, name) {
    let left = 0, right = artists.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (artists[mid].name === name) return artists[mid].id; // L'artiste est trouvé
      if (artists[mid].name < name) left = mid + 1; // Rechercher dans la moitié droite
      else right = mid - 1; // Rechercher dans la moitié gauche
    }
    return -1; // L'artiste n'est pas trouvé
  }
  
  // Optimisation de l'attribution des scènes en utilisant une table de correspondance
  // Cette méthode améliore l'efficacité en réduisant les comparaisons répétées
  function assignStagesOptimized(artists, stages) {
    // Création d'un objet associant chaque genre musical à son ID de scène
    const genreToStage = Object.fromEntries(
      stages.flatMap(stage => stage.genres.map(genre => [genre, stage.id]))
    );
    
    // Attribution rapide des scènes grâce à la table de correspondance
    artists.forEach(artist => {
      artist.stage = genreToStage[artist.genre] || null; // Assigne l'ID de la scène ou null si le genre n'est pas trouvé
    });
  }
  


// Outil de test et benchmark
function benchmark(name, fn, args, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn(...args);
  }
  const end = performance.now();
  return { name, time: (end - start) / iterations };
}

function compareAlgorithms(testName, algorithms, args, iterations = 1000) {
  const results = algorithms.map(({ name, fn }) => benchmark(name, fn, args, iterations));
  results.sort((a, b) => a.time - b.time);
  console.table(results);
}







// Tests des algorithmes
const testArray1 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
const testArray2 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

compareAlgorithms('Test de performance', [
  { name: 'containsDuplicate', fn: containsDuplicate },
  { name: 'findCommonElements', fn: findCommonElements },
  { name: 'fibonacci', fn: fibonacci }
], [testArray1, testArray2], 100);

// Fonction containsDuplicate optimisée
function containsDuplicateOptimized(array) {
  const seen = new Set();
  for (const num of array) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

// Fonction findCommonElements optimisée
function findCommonElementsOptimized(array1, array2) {
  const set1 = new Set(array1);
  return array2.filter(num => set1.has(num));
}

// Fonction Fibonacci optimisée
function fibonacciOptimized(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibonacciOptimized(n - 1, memo) + fibonacciOptimized(n - 2, memo);
}
