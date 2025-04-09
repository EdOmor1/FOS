import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for hormone trends - replace with real data integration
const mockHormoneData = [
  { day: 1, lh: 5, e3g: 50, pdg: 0.5 },
  { day: 3, lh: 6, e3g: 60, pdg: 0.6 },
  { day: 5, lh: 7, e3g: 80, pdg: 0.7 },
  { day: 7, lh: 8, e3g: 100, pdg: 0.8 },
  { day: 9, lh: 10, e3g: 150, pdg: 1.0 },
  { day: 11, lh: 20, e3g: 200, pdg: 1.2 },
  { day: 13, lh: 45, e3g: 250, pdg: 1.5 }, // LH Surge Approximation
  { day: 14, lh: 15, e3g: 220, pdg: 3.0 }, // Ovulation Approximation
  { day: 16, lh: 10, e3g: 180, pdg: 8.0 },
  { day: 18, lh: 8, e3g: 150, pdg: 12.0 },
  { day: 20, lh: 7, e3g: 130, pdg: 15.0 },
  { day: 22, lh: 6, e3g: 110, pdg: 13.0 },
  { day: 24, lh: 5, e3g: 90, pdg: 10.0 },
  { day: 26, lh: 5, e3g: 70, pdg: 5.0 },
  { day: 28, lh: 4, e3g: 60, pdg: 1.0 },
];

// Helper function to format dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const FertilityDashboard: React.FC = () => {
  // --- State ---
  // Simulate current cycle data (would come from user input/backend)
  const [cycleData, setCycleData] = useState({
    currentDay: 14,
    cycleLength: 28,
    periodStartDate: new Date(new Date().setDate(new Date().getDate() + 14)), // Predicted next period
    fertileWindowStart: new Date(new Date().setDate(new Date().getDate() - 3)), // Example window
    fertileWindowEnd: new Date(new Date().setDate(new Date().getDate() + 2)),
  });

  // Simulate AI Predictions (would come from ML models)
  const [aiPrediction, setAiPrediction] = useState({
    fertilityScore: 8, // Example score out of 10
    ovulationPredictionConfidence: 'High' as 'Low' | 'Medium' | 'High',
    insight: 'High chance of conception today based on typical patterns and recent inputs.',
  });

   // Simulate user logging status
  const [logStatus, setLogStatus] = useState<string | null>(null);

  // --- Handlers ---
  const handleLogData = (dataType: string) => {
      setLogStatus(`Navigating to log ${dataType}... (Simulated)`);
      // In a real app, this would navigate or open a modal
      setTimeout(() => setLogStatus(null), 2000); // Clear message after 2 seconds
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8 text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">My Fertility Dashboard</h1>
        <p className="text-gray-600">Your personalized fertility insights and tracking.</p>
      </header>

      {logStatus && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center">
              {logStatus}
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Cycle Overview Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Current Cycle</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cycle Day:</span>
              <span className="text-2xl font-bold text-purple-900">{cycleData.currentDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Est. Fertile Window:</span>
              <span className="font-medium text-green-700">{formatDate(cycleData.fertileWindowStart)} - {formatDate(cycleData.fertileWindowEnd)}</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-gray-600">Predicted Period:</span>
              <span className="font-medium text-pink-700">{formatDate(cycleData.periodStartDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Est. Cycle Length:</span>
              <span className="font-medium text-gray-700">{cycleData.cycleLength} days</span>
            </div>
          </div>
        </div>

        {/* AI Predictions Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">AI Insights</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today's Fertility Score:</span>
              <span className={`text-2xl font-bold ${aiPrediction.fertilityScore > 7 ? 'text-green-600' : aiPrediction.fertilityScore > 4 ? 'text-yellow-600' : 'text-red-600'}`}>
                {aiPrediction.fertilityScore}/10
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ovulation Prediction:</span>
              <span className={`font-medium px-2 py-0.5 rounded-full text-sm ${
                aiPrediction.ovulationPredictionConfidence === 'High' ? 'bg-green-100 text-green-800' :
                aiPrediction.ovulationPredictionConfidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {aiPrediction.ovulationPredictionConfidence} Confidence
              </span>
            </div>
             <p className="text-sm text-gray-700 pt-2 border-t border-gray-200 mt-3">{aiPrediction.insight}</p>
          </div>
        </div>

        {/* Quick Log Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Log Your Data</h2>
          <p className="text-sm text-gray-600 mb-4">Consistent tracking improves prediction accuracy.</p>
          <div className="grid grid-cols-2 gap-3">
             <button
                onClick={() => handleLogData('Symptoms')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Log Symptoms
              </button>
               <button
                onClick={() => handleLogData('Temperature')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Log Temp (BBT)
              </button>
              <button
                onClick={() => handleLogData('Mood')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Log Mood
              </button>
               <button
                onClick={() => handleLogData('Test Result')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm"
              >
                Log Test Result
              </button>
          </div>
        </div>

         {/* Hormone Trends Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Hormone Trends (Example)</h2>
            <p className="text-sm text-gray-600 mb-4">Visualize your hormone fluctuations throughout the cycle. Connect diagnostic devices for real-time data.</p>
             {/* Placeholder for real device integration prompt */}
            <div className="mb-4 p-3 bg-gray-100 border border-dashed border-gray-300 rounded-lg text-center text-gray-600 text-sm">
                Connect devices like Mira or Oova to see your actual hormone levels here. Displaying sample data.
            </div>
            <div className="h-72 md:h-96 w-full"> {/* Increased height */}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={mockHormoneData}
                    margin={{
                        top: 5,
                        right: 20, // Added right margin for labels
                        left: 0,  // Adjusted left margin
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" label={{ value: 'Cycle Day', position: 'insideBottom', dy: 10 }} stroke="#6b7280" fontSize={12} />
                    <YAxis yAxisId="left" label={{ value: 'LH / E3G', angle: -90, position: 'insideLeft', dx: -5 }} stroke="#4b5563" fontSize={12} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'PdG', angle: 90, position: 'insideRight', dx: 5 }} stroke="#be185d" fontSize={12} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                        itemStyle={{ color: '#374151' }}
                        labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                     />
                    <Legend wrapperStyle={{ paddingTop: '15px' }}/>
                    <Line yAxisId="left" type="monotone" dataKey="lh" name="LH (mIU/mL)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    <Line yAxisId="left" type="monotone" dataKey="e3g" name="E3G (ng/mL)" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="pdg" name="PdG (ug/mL)" stroke="#ec4899" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Placeholder: Lifestyle Recommendations */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Personalized Tips</h2>
          <div className="space-y-3">
             <div className="flex items-start space-x-3">
                 <div className="bg-green-100 text-green-700 rounded-full p-1.5 mt-1">
                    {/* Simple icon placeholder */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                 </div>
                 <p className="text-sm text-gray-700">Focus on stress reduction techniques during the luteal phase. Try meditation or light yoga.</p>
             </div>
              <div className="flex items-start space-x-3">
                 <div className="bg-green-100 text-green-700 rounded-full p-1.5 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3h4M19 5v4M17 17h4m-2 2v-4m-7 1V3m-2 2h4" />
                    </svg>
                 </div>
                 <p className="text-sm text-gray-700">Ensure adequate intake of folate-rich foods like leafy greens and lentils, especially around your fertile window.</p>
             </div>
          </div>
        </div>

        {/* Placeholder: Connected Devices */}
         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Connected Devices</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
                 <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Device</span>
                 </div>
                 <span>No devices connected yet. Link your wearables or diagnostic tools for enhanced insights.</span>
            </div>
            <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm w-full">
                Connect Device
            </button>
        </div>

        {/* Placeholder: Community / Support */}
         <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100">
          <h2 className="text-xl font-semibold text-pink-700 mb-4">Support & Community</h2>
           <p className="text-sm text-gray-600 mb-4">Connect with others, access resources, and find mental wellness support.</p>
             <div className="space-y-2">
                <button className="bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm w-full text-left">
                    Join Community Forum
                </button>
                 <button className="bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out text-sm w-full text-left">
                    Find Mental Health Resources
                </button>
             </div>
        </div>

      </div>

       {/* Footer - Important Note */}
        <footer className="mt-12 text-center text-xs text-gray-500">
            <p>This is a dashboard simulation. Ensure all data handling complies with HIPAA and other relevant privacy regulations in a real application.</p>
            <p>&copy; {new Date().getFullYear()} Fertility Super App Concept</p>
        </footer>

    </div>
  );
};

export default FertilityDashboard;