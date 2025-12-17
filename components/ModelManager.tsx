import React, { useState } from 'react';
import { VirtualModel, Gender, BodyShape, SkinTone } from '../types';

interface ModelManagerProps {
  models: VirtualModel[];
  setModels: React.Dispatch<React.SetStateAction<VirtualModel[]>>;
}

const ModelManager: React.FC<ModelManagerProps> = ({ models, setModels }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [bodyShape, setBodyShape] = useState<BodyShape>(BodyShape.SLIM);
  const [skinTone, setSkinTone] = useState<SkinTone>(SkinTone.MEDIUM);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) return;

    // Simulate "creating" a model by generating a consistent ID and using a placeholder
    // In a real app, this would trigger an API call to generate a base avatar.
    const newModel: VirtualModel = {
      id: Date.now().toString(),
      name,
      gender,
      bodyShape,
      skinTone,
      previewUrl: `https://picsum.photos/seed/${name}/300/400` // Using seed for deterministic placeholder
    };

    setModels([...models, newModel]);
    setName('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Create Virtual Model</h2>
        <p className="text-gray-500">Define the physical attributes of your AI model for accurate fittings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Summer Look Avatar"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Gender).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border ${
                    gender === g ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Shape</label>
            <select 
              value={bodyShape} 
              onChange={(e) => setBodyShape(e.target.value as BodyShape)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
            >
              {Object.values(BodyShape).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skin Tone</label>
            <div className="flex gap-4">
              {Object.values(SkinTone).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSkinTone(tone)}
                  className={`flex flex-col items-center gap-1 group`}
                >
                  <div className={`w-12 h-12 rounded-full border-4 ${
                    skinTone === tone ? 'border-brand-500 scale-110' : 'border-transparent group-hover:border-gray-200'
                  } transition-all`}
                  style={{ 
                    backgroundColor: tone === SkinTone.LIGHT ? '#f5d0b0' : tone === SkinTone.MEDIUM ? '#c68642' : '#593c28' 
                  }}
                  ></div>
                  <span className="text-xs text-gray-500">{tone}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreate}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand-500/30"
          >
            Create Model
          </button>
          
          {isSuccess && (
             <div className="p-3 bg-green-50 text-green-700 text-center rounded-lg animate-fade-in">
                 Model created successfully!
             </div>
          )}
        </div>

        {/* Existing Models List */}
        <div className="space-y-4">
           <h3 className="font-semibold text-gray-700">Your Models</h3>
           {models.length === 0 ? (
               <div className="text-center p-8 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                   <p className="text-gray-400">No models created yet.</p>
               </div>
           ) : (
               <div className="grid grid-cols-2 gap-4">
                   {models.map(model => (
                       <div key={model.id} className="relative group bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                           <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden">
                               <img src={model.previewUrl} alt={model.name} className="w-full h-full object-cover" />
                           </div>
                           <h4 className="font-medium text-gray-800">{model.name}</h4>
                           <p className="text-xs text-gray-500">{model.gender} • {model.bodyShape}</p>
                           <button 
                                onClick={() => setModels(models.filter(m => m.id !== model.id))}
                                className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-white"
                           >
                               <i className="fa-solid fa-trash-can"></i>
                           </button>
                       </div>
                   ))}
               </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ModelManager;