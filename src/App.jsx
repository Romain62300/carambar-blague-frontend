import { useState } from 'react';

function App() {
  const [blague, setBlague] = useState(null);
  const [chargement, setChargement] = useState(false);

  const recupererBlague = async () => {
    setChargement(true);
    try {
      const reponse = await fetch('http://localhost:3000/api/v1/blagues/random');
      const donnees = await reponse.json();
      setBlague(donnees);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de la blague :', erreur);
      setBlague({ question: 'Oups !', reponse: 'Une erreur est survenue. Réessayez !' });
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Blagues Carambar & Co</h1>
      <button
  onClick={recupererBlague}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
  disabled={chargement}
>
  {chargement ? 'Chargement...' : 'Raconte-moi une blague !'}
</button>

      {blague && (
        <div className="mt-8 text-center max-w-md">
          <p className="text-xl font-semibold text-gray-800">{blague.question}</p>
          <p className="text-lg text-gray-600 mt-2">{blague.reponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
