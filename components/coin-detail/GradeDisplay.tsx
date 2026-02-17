'use client';

import { useState } from 'react';
import { Award, Users, TrendingUp, Calendar, Info } from 'lucide-react';
import { Grade } from '@/types';
import { getGradeBadgeClass, getServiceColor, formatDate } from '@/lib/utils';

interface GradeDisplayProps {
  grades: Grade[];
  selectedGrade: Grade | null;
  onGradeSelect: (grade: Grade) => void;
}

export function GradeDisplay({ grades, selectedGrade, onGradeSelect }: GradeDisplayProps) {
  const [showAllGrades, setShowAllGrades] = useState(false);

  if (grades.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Grading Information
        </h2>
        <div className="text-center py-8">
          <Award className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            No certified grades available for this coin yet.
          </p>
        </div>
      </div>
    );
  }

  const displayGrades = showAllGrades ? grades : grades.slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Certified Grades
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {grades.length} grade{grades.length === 1 ? '' : 's'} available
        </div>
      </div>

      {/* Grade Selection */}
      <div className="space-y-3 mb-6">
        {displayGrades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => onGradeSelect(grade)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedGrade?.id === grade.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Service Badge */}
                <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${getServiceColor(grade.service)} bg-gray-100 dark:bg-gray-700`}>
                  {grade.service}
                </div>
                
                {/* Grade Badge */}
                <span className={`grade-badge ${getGradeBadgeClass(grade.grade, grade.service)}`}>
                  {grade.grade}
                </span>
              </div>

              <div className="text-right">
                {grade.certificationNumber && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Cert #{grade.certificationNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Additional grade info */}
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              {grade.population && (
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>Pop: {grade.population.toLocaleString()}</span>
                </div>
              )}
              
              {grade.populationHigher && (
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Higher: {grade.populationHigher.toLocaleString()}</span>
                </div>
              )}

              {grade.gradedDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(grade.gradedDate)}</span>
                </div>
              )}
            </div>

            {grade.notes && (
              <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                <Info className="h-3 w-3 inline mr-1" />
                {grade.notes}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Show More/Less Toggle */}
      {grades.length > 4 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllGrades(!showAllGrades)}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            {showAllGrades 
              ? `Show Less (${grades.length - 4} hidden)`
              : `Show All Grades (+${grades.length - 4} more)`
            }
          </button>
        </div>
      )}

      {/* Selected Grade Details */}
      {selectedGrade && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
            Grade Details
          </h3>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Service</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedGrade.service}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Grade</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedGrade.grade}
                </div>
              </div>

              {selectedGrade.certificationNumber && (
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cert Number</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedGrade.certificationNumber}
                  </div>
                </div>
              )}

              {selectedGrade.numericGrade && (
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Numeric Grade</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedGrade.numericGrade}
                  </div>
                </div>
              )}

              {selectedGrade.population && (
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Population</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedGrade.population.toLocaleString()}
                  </div>
                </div>
              )}

              {selectedGrade.populationHigher && (
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Population Higher</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedGrade.populationHigher.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {selectedGrade.gradedDate && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Graded Date</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatDate(selectedGrade.gradedDate)}
                </div>
              </div>
            )}

            {selectedGrade.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Notes</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedGrade.notes}
                </div>
              </div>
            )}
          </div>

          {/* Grade Image */}
          {selectedGrade.imageUrl && (
            <div className="mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Certified Coin Image
              </div>
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <img
                  src={selectedGrade.imageUrl}
                  alt={`${selectedGrade.service} certified coin`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grade Information Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-2">
            <strong>Population:</strong> Number of coins graded at this grade level
          </p>
          <p>
            <strong>Population Higher:</strong> Number of coins graded higher than this grade
          </p>
        </div>
      </div>
    </div>
  );
}