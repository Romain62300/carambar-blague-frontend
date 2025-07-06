/*import { useState } from 'react';

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
*/
/*import { useState } from 'react';

function App() {
  const [blague, setBlague] = useState(null);
  const [chargement, setChargement] = useState(false);

  const recupererBlague = async () => {
    setChargement(true);
    try {
      const reponse = await fetch('https://carambar-blague-api.onrender.com/api/v1/blagues/random');
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
*/
import { useState } from 'react';

function App() {
  const [blague, setBlague] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [toutesLesBlagues, setToutesLesBlagues] = useState([]);
  const [nouvelleQuestion, setNouvelleQuestion] = useState('');
  const [nouvelleReponse, setNouvelleReponse] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const BASE_URL = 'http://localhost:3000/api/v1/blagues';

  const recupererBlague = async () => {
    setChargement(true);
    try {
      const reponse = await fetch(`${BASE_URL}/random`);
      const donnees = await reponse.json();
      setBlague(donnees);
      setToutesLesBlagues([]);
    } catch (erreur) {
      console.error('Erreur lors de la récupération de la blague :', erreur);
      setBlague({ question: 'Oups !', reponse: 'Une erreur est survenue. Réessayez !' });
    } finally {
      setChargement(false);
    }
  };

  const recupererToutesLesBlagues = async () => {
    setChargement(true);
    try {
      const reponse = await fetch(BASE_URL);
      const donnees = await reponse.json();
      setToutesLesBlagues(donnees);
      setBlague(null);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des blagues :', erreur);
      setToutesLesBlagues([]);
    } finally {
      setChargement(false);
    }
  };

  const ajouterBlague = async (e) => {
    e.preventDefault();
    setConfirmation('');
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: nouvelleQuestion,
          reponse: nouvelleReponse,
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'ajout');

      setConfirmation('✅ Blague ajoutée avec succès !');
      setNouvelleQuestion('');
      setNouvelleReponse('');
    } catch (err) {
      setConfirmation('❌ Erreur : impossible d\'ajouter la blague.');
    }
  };

  const supprimerBlague = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erreur suppression');
      setToutesLesBlagues(toutesLesBlagues.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-yellow-50">
      <h1 className="text-4xl font-bold text-black mb-8">Blagues Carambar & Co</h1>

      <div className="flex gap-4">
        <button
          onClick={recupererBlague}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          disabled={chargement}
        >
          {chargement ? 'Chargement...' : 'Raconte-moi une blague !'}
        </button>

        <button
          onClick={recupererToutesLesBlagues}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          disabled={chargement}
        >
          {chargement ? 'Chargement...' : 'Voir toutes les blagues'}
        </button>
      </div>

      {blague && (
        <div className="mt-8 text-center max-w-md">
          <p className="text-xl font-semibold text-gray-800">{blague.question}</p>
          <p className="text-lg text-gray-600 mt-2">{blague.reponse}</p>
        </div>
      )}

      {toutesLesBlagues.length > 0 && (
        <div className="mt-8 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Liste de toutes les blagues :</h2>
          <ul className="list-disc pl-6 text-left text-gray-800">
            {toutesLesBlagues.map((b) => (
              <li key={b.id} className="mb-4 flex justify-between items-start gap-4">
                <div>
                  <strong>{b.question}</strong><br />
                  <em>{b.reponse}</em>
                </div>
                <button
                  onClick={() => supprimerBlague(b.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={ajouterBlague} className="mt-10 w-full max-w-md bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Ajouter une nouvelle blague</h2>

        <input
          type="text"
          placeholder="Question"
          value={nouvelleQuestion}
          onChange={(e) => setNouvelleQuestion(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Réponse"
          value={nouvelleReponse}
          onChange={(e) => setNouvelleReponse(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Ajouter la blague
        </button>

        {confirmation && <p className="mt-3 text-sm">{confirmation}</p>}
      </form>
    </div>
  );
}

export default App;
