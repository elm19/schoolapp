"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Search, Filter, BookOpen, Loader2 } from "lucide-react";
import { StudyPlanData, Module } from "@/lib/scrapper";

interface StudyPlanClientProps {
  initialData: StudyPlanData;
  sessionId: string;
}

export function StudyPlanClient({ initialData, sessionId }: StudyPlanClientProps) {
  const [studyPlanData, setStudyPlanData] = useState<StudyPlanData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState(initialData.selectedLevel);
  const [selectedProgram, setSelectedProgram] = useState(initialData.selectedProgram);
  const [selectedSemester, setSelectedSemester] = useState(initialData.selectedSemester);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("_csrf", studyPlanData.csrfToken);
    formData.append("sessionId", sessionId);
    formData.append("niveau", selectedLevel);
    formData.append("filiere", selectedProgram);
    formData.append("semestre", selectedSemester);

    try {
      const response = await fetch("/api/study-plan", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newData = await response.json();
        setStudyPlanData(newData);
        setExpandedModules(new Set());
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModule = (moduleCode: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleCode)) {
      newExpanded.delete(moduleCode);
    } else {
      newExpanded.add(moduleCode);
    }
    setExpandedModules(newExpanded);
  };

  // Filtrer les modules basé sur la recherche
  const filteredModules = studyPlanData.modules?.filter(module =>
    module.intitule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.codeMod.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
       {/* Simple Horizontal Form */}
<div className="mb-6 p-6 bg-white border rounded-lg shadow-sm">
  <form onSubmit={handleSubmit}>
    <input type="hidden" name="_csrf" value={studyPlanData.csrfToken} />
    <input type="hidden" name="sessionId" value={sessionId} />
    
    <div className="flex flex-wrap items-center gap-4">
      {/* Niveau */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Niveau :</span>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {studyPlanData.levels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filière */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Filière :</span>
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {studyPlanData.programs.map((program) => (
              <SelectItem key={program.value} value={program.value}>
                {program.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Semestre */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Semestre :</span>
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {studyPlanData.semesters.map((semester) => (
              <SelectItem key={semester.value} value={semester.value}>
                {semester.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4"
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "Valider"}
      </Button>
    </div>
  </form>
</div>

        {/* Modules Table */}
        <StudyPlanTable 
          modules={filteredModules}
          expandedModules={expandedModules}
          onToggleModule={toggleModule}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

interface StudyPlanTableProps {
  modules: Module[];
  expandedModules: Set<string>;
  onToggleModule: (moduleCode: string) => void;
  searchTerm: string;
}

function StudyPlanTable({ modules, expandedModules, onToggleModule, searchTerm }: StudyPlanTableProps) {
  if (!Array.isArray(modules) || modules.length === 0) {
    return (
      <Card className="p-8 text-center bg-white border shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-4">
          <BookOpen className="h-16 w-16 text-gray-400" />
          <p className="text-gray-500 text-lg font-medium">
            {searchTerm ? "Aucun module trouvé pour votre recherche" : "Aucun module trouvé pour les critères sélectionnés"}
          </p>
          <p className="text-gray-400">
            {searchTerm ? "Essayez avec d'autres termes de recherche" : "Veuillez ajuster votre sélection et cliquer sur 'Valider'"}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Liste des modules et éléments
          </CardTitle>
          <Badge variant="secondary" className="text-sm">
            {modules.length} module(s)
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50 border-b border-blue-100">
                <th className="w-12 px-4 py-3 text-left"></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  CodeMod
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Intitulé
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Descriptif
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Semestre
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  VHMOD
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  CoefMod
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Seuil
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Eliminatoire
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {modules.map((module) => (
                <ModuleTableRow
                  key={module.codeMod}
                  module={module}
                  isExpanded={expandedModules.has(module.codeMod)}
                  onToggle={() => onToggleModule(module.codeMod)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

interface ModuleTableRowProps {
  module: Module;
  isExpanded: boolean;
  onToggle: () => void;
}

function ModuleTableRow({ module, isExpanded, onToggle }: ModuleTableRowProps) {
  return (
    <>
      {/* Module Row */}
      <tr 
        className="bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
        onClick={onToggle}
      >
        <td className="px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
            )}
          </Button>
        </td>
        <td className="px-4 py-3">
          <Badge variant="outline" className="font-mono text-xs">
            {module.codeMod}
          </Badge>
        </td>
        <td className="px-4 py-3 font-medium text-gray-900">
          {module.intitule}
        </td>
        <td className="px-4 py-3 text-sm text-gray-500">
          {module.descriptif || "-"}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {module.niveau}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {module.semestre}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600 font-medium">
          {module.vhMod}h
        </td>
        <td className="px-4 py-3 text-sm text-gray-600 font-medium">
          {module.coefMod}
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">
          {module.seuil}
        </td>

<td className="px-4 py-3">
  {module.eliminatoire.toLowerCase() === 'oui' ? (
    <Badge variant="destructive" className="text-xs">
      {module.eliminatoire}
    </Badge>
  ) : (
    <Badge variant="outline" className="text-xs">
      {module.eliminatoire}
    </Badge>
  )}
</td>
      </tr>
      
      {/* Elements Table - Only show when expanded */}
      {isExpanded && Array.isArray(module.elements) && module.elements.length > 0 && (
        <tr className="bg-gray-50 border-b">
          <td colSpan={10} className="px-0 py-4">
            <div className="px-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-3 text-sm uppercase tracking-wide">
                  Éléments du module {module.codeMod} ({module.elements.length} élément(s))
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-amber-100">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          CodeElem
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          Intitulé
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          VHCTD
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          VHTP
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          VHEVAL
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          CoefCC
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          CoefEX
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          CoefEcrit
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          CoefTP
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          CoefEelem
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-100">
                      {module.elements.map((element) => (
                        <tr key={element.codeElem} className="hover:bg-amber-50 transition-colors">
                          <td className="px-4 py-2 text-sm font-mono text-gray-700">
                            {element.codeElem}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {element.intitule}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.vhCTD}h
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.vhTP}h
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.vhEval}h
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.coefCC}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.coefEX}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.coefEcrit}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center">
                            {element.coefTP}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-600 text-center font-medium">
                            {element.coefEelem}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}