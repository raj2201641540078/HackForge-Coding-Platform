import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  PlusCircle, Trash2, X, ArrowRight,
  FileJson, Code, List, Tag, Building,
  Lightbulb, AlertCircle, MessageSquare, Loader2
} from 'lucide-react';
import axiosClient from '../../config/axios'; 

// --- Constants (can be moved to a shared file) ---
const ProblemDifficulty = {
  Basic: 'Basic',
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

const problemTags = [
  "strings", "arrays", "linked-list", "stacks", "queues", "hash-maps", "sorting",
  "searching", "binary-search", "graphs", "trees", "dynamic-programming", "backtracking",
  "greedy", "heap", "bit-manipulation", "mathematical", "two-pointers",
  "sliding-window", "recursion", "design", "math", "other"
];

const codeLanguages = ["c", "cpp", "java", "python", "javascript"];
// ---

const UpdateProblem = () => {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm();

  // Effect to fetch problem data and pre-fill the form
  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        const { data: problemData } = await axiosClient.get(`/problems/${problemId}`);

        // Transform simple string arrays into the format useFieldArray expects: [{ value: '...' }]
        const transformedData = {
          ...problemData,
          constraints: problemData.constraints.map(value => ({ value })),
          companies: problemData.companies.map(value => ({ value })),
          hints: problemData.hints.map(value => ({ value })),
        };
        
        reset(transformedData);
        
      } catch (error) {
        console.error("Failed to fetch problem data:", error);
        setFetchError("Could not load the problem. Please check the ID and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (problemId) {
      fetchProblemData();
    }
  }, [problemId, reset]);

  const tags = watch('tags');

  const { fields: constraintFields, append: appendConstraint, remove: removeConstraint } = useFieldArray({ control, name: 'constraints' });
  const { fields: companyFields, append: appendCompany, remove: removeCompany } = useFieldArray({ control, name: 'companies' });
  const { fields: hintFields, append: appendHint, remove: removeHint } = useFieldArray({ control, name: 'hints' });
  const { fields: exampleFields, append: appendExample, remove: removeExample } = useFieldArray({ control, name: 'examples' });
  const { fields: visibleTCFields, append: appendVisibleTC, remove: removeVisibleTC } = useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenTCFields, append: appendHiddenTC, remove: removeHiddenTC } = useFieldArray({ control, name: 'hiddenTestCases' });
  const { fields: starterCodeFields, append: appendStarterCode, remove: removeStarterCode } = useFieldArray({ control, name: 'starterCode' });
  const { fields: refSolutionFields, append: appendRefSolution, remove: removeRefSolution } = useFieldArray({ control, name: 'referenceSolution' });

  const handleAddTag = (tag) => {
    if (tag && !tags?.includes(tag)) {
      setValue('tags', [...(tags || []), tag], { shouldValidate: true, shouldDirty: true });
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove), { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      constraints: formData.constraints.map(c => c.value.trim()).filter(Boolean),
      companies: formData.companies.map(c => c.value.trim()).filter(Boolean),
      hints: formData.hints.map(h => h.value.trim()).filter(Boolean),
      examples: formData.examples.map(ex => ({ input: ex.input.trim(), output: ex.output.trim(), explanation: ex.explanation.trim() })),
      visibleTestCases: formData.visibleTestCases.map(tc => ({ input: tc.input.trim(), output: tc.output.trim() })),
      hiddenTestCases: formData.hiddenTestCases.map(tc => ({ input: tc.input.trim(), output: tc.output.trim() })),
      starterCode: formData.starterCode.map(sc => ({ language: sc.language.trim(), headerCode: sc.headerCode.trim(), code: sc.code.trim(), mainCode: sc.mainCode.trim() })),
      referenceSolution: formData.referenceSolution.map(rs => ({ language: rs.language.trim(), solutionCode: rs.solutionCode.trim() }))
    };

    try {
      await axiosClient.put(`/problems/${problemId}/update`, payload);
      alert('Problem updated successfully!');
      navigate('/problems');
    } catch (error) {
      console.error("Failed to update problem:", error);
      alert('An error occurred while updating the problem.');
    }
  };

  // --- UI & Styling ---
  const inputBaseClasses = "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-2.5 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const labelClasses = "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
  const sectionClasses = "bg-white dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm";
  const sectionTitleClasses = "flex items-center space-x-3 text-xl font-bold border-b border-[#E2E8F0] dark:border-[#334155] pb-4 mb-6 text-[#0F172A] dark:text-[#F8FAFC]";
  const subCardClasses = "p-4 bg-[#F1F5F9] dark:bg-[#0F172A] rounded-xl border border-[#E2E8F0] dark:border-[#334155]/50 transition-all duration-300 hover:border-[#F97316]/30";
  const errorClasses = "text-red-500 text-sm mt-1";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#F97316]" size={48} />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-red-500 text-lg">
        <AlertCircle className="mb-2" size={48} /> 
        <p>{fetchError}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Section 1: Basic Information */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><List size={24} className="text-[#F97316]" /><span>Basic Information</span></h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className={labelClasses}>Title</label>
              <input type="text" id="title" {...register('title', { required: 'Title is required' })} className={inputBaseClasses} />
              {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="problemNo" className={labelClasses}>Problem Number</label>
              <input type="number" id="problemNo" {...register('problemNo', { required: 'Problem number is required', valueAsNumber: true, min: { value: 1, message: "Problem number must be at least 1" } })} className={inputBaseClasses} />
              {errors.problemNo && <p className={errorClasses}>{errors.problemNo.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="difficulty" className={labelClasses}>Difficulty</label>
            <select id="difficulty" {...register('difficulty')} className={inputBaseClasses}>
              {Object.values(ProblemDifficulty).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="description" className={labelClasses}>Description (Markdown supported)</label>
            <textarea id="description" {...register('description', { required: 'Description is required' })} className={`${inputBaseClasses} min-h-[150px]`} />
            {errors.description && <p className={errorClasses}>{errors.description.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Metadata */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><Tag size={24} className="text-[#F97316]" /><span>Metadata</span></h2>
        <div className="space-y-8">
          <div>
            <label htmlFor="tags-select" className={labelClasses}>Tags</label>
            <select id="tags-select" onChange={e => { handleAddTag(e.target.value); e.target.value = ''; }} className={inputBaseClasses} defaultValue="">
              <option value="" disabled>Select a tag to add...</option>
              {problemTags.filter(t => !(tags || []).includes(t)).map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <div className={`flex flex-wrap items-center gap-2 mt-3 p-2 min-h-[42px] rounded-lg ${inputBaseClasses}`}>
              <input type="hidden" {...register('tags', { validate: value => (value && value.length > 0) || 'At least one tag is required' })} />
              {tags?.length > 0 ? tags.map(tag => (
                <div key={tag} className="flex items-center gap-1.5 bg-[#F97316]/20 text-[#F97316] text-sm font-medium px-2.5 py-1 rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-[#F97316] hover:bg-white/20 rounded-full p-0.5"><X size={14} /></button>
                </div>
              )) : <span className="text-sm text-[#64748B] dark:text-[#94A3B8] px-1">No tags selected.</span>}
            </div>
            {errors.tags && <p className={errorClasses}>{errors.tags.message}</p>}
          </div>

          {[
            { label: 'Constraints', fields: constraintFields, append: () => appendConstraint({ value: '' }), remove: removeConstraint, icon: <AlertCircle size={20} />, placeholder: 'e.g., 2 <= nums.length <= 10^4', name: 'constraints', required: 'At least one constraint is required' },
            { label: 'Companies', fields: companyFields, append: () => appendCompany({ value: '' }), remove: removeCompany, icon: <Building size={20} />, placeholder: 'e.g., Google', name: 'companies' },
            { label: 'Hints', fields: hintFields, append: () => appendHint({ value: '' }), remove: removeHint, icon: <Lightbulb size={20} />, placeholder: 'e.g., Consider using a hash map', name: 'hints' }
          ].map(({ label, fields, append, remove, icon, placeholder, name, required }) => (
            <div key={label}>
              <h3 className="flex items-center space-x-2 text-md font-semibold mb-3 text-[#0F172A] dark:text-[#F8FAFC]">{icon}<span>{label}</span></h3>
              <div className="space-y-3">
                <input type="hidden" {...register(name, { validate: (value) => !required || (value && value.length > 0) || required })}/>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input {...register(`${name}.${index}.value`)} className={inputBaseClasses} placeholder={`${placeholder} #${index + 1}`} />
                    <button type="button" onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => append()} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add {label.slice(0, -1)}</span></button>
               {errors[name] && <p className={errorClasses}>{errors[name].message}</p>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Section 3: Examples & Test Cases */}
      <div className={sectionClasses}>
          <h2 className={sectionTitleClasses}><FileJson size={24} className="text-[#F97316]" /><span>Examples & Test Cases</span></h2>
          <div className="space-y-8">
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <MessageSquare size={20} /><span>Examples</span>
                      <span className="text-xs font-normal bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300 px-2 py-0.5 rounded-full">Shown in description</span>
                  </h3>
                  <div className="space-y-4">
                      {exampleFields.map((field, index) => (
                          <div key={field.id} className={subCardClasses}>
                              <div className="flex justify-between items-center mb-4">
                                  <p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC]">Example #{index + 1}</p>
                                  <button type="button" onClick={() => removeExample(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                              </div>
                              <div className="space-y-4">
                                  <div><label className={labelClasses}>Input</label><textarea {...register(`examples.${index}.input`, { required: 'Input is required' })} className={`${inputBaseClasses} font-mono text-sm`} />{errors.examples?.[index]?.input && <p className={errorClasses}>{errors.examples[index].input.message}</p>}</div>
                                  <div><label className={labelClasses}>Output</label><textarea {...register(`examples.${index}.output`)} className={`${inputBaseClasses} font-mono text-sm`} /></div>
                                  <div><label className={labelClasses}>Explanation</label><textarea {...register(`examples.${index}.explanation`, { required: 'Explanation is required' })} className={inputBaseClasses} />{errors.examples?.[index]?.explanation && <p className={errorClasses}>{errors.examples[index].explanation.message}</p>}</div>
                              </div>
                          </div>
                      ))}
                      <button type="button" onClick={() => appendExample({ input: '', output: '', explanation: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Example</span></button>
                  </div>
              </div>
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Visible Test Cases</span><span className="text-xs font-normal bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 px-2 py-0.5 rounded-full">For basic checks</span>
                  </h3>
                  <div className="space-y-4">
                      {visibleTCFields.map((field, index) => (<div key={field.id} className={subCardClasses}><div className="flex justify-between items-start mb-2"><p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC] pt-2">Visible Case #{index + 1}</p><button type="button" onClick={() => removeVisibleTC(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className={labelClasses}>Input</label><textarea {...register(`visibleTestCases.${index}.input`, { required: 'Input is required' })} className={`${inputBaseClasses} font-mono text-sm`} />{errors.visibleTestCases?.[index]?.input && <p className={errorClasses}>{errors.visibleTestCases[index].input.message}</p>}</div><div><label className={labelClasses}>Output</label><textarea {...register(`visibleTestCases.${index}.output`)} className={`${inputBaseClasses} font-mono text-sm`} /></div></div></div>))}
                      <button type="button" onClick={() => appendVisibleTC({ input: '', output: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Visible Test Case</span></button>
                  </div>
              </div>
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Hidden Test Cases</span><span className="text-xs font-normal bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300 px-2 py-0.5 rounded-full">Used for judging</span>
                  </h3>
                  <div className="space-y-4">
                      {hiddenTCFields.map((field, index) => (<div key={field.id} className={subCardClasses}><div className="flex justify-between items-start mb-2"><p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC] pt-2">Hidden Case #{index + 1}</p><button type="button" onClick={() => removeHiddenTC(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className={labelClasses}>Input</label><textarea {...register(`hiddenTestCases.${index}.input`, { required: 'Input is required' })} className={`${inputBaseClasses} font-mono text-sm`} />{errors.hiddenTestCases?.[index]?.input && <p className={errorClasses}>{errors.hiddenTestCases[index].input.message}</p>}</div><div><label className={labelClasses}>Output</label><textarea {...register(`hiddenTestCases.${index}.output`)} className={`${inputBaseClasses} font-mono text-sm`} /></div></div></div>))}
                      <button type="button" onClick={() => appendHiddenTC({ input: '', output: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Hidden Test Case</span></button>
                  </div>
              </div>
          </div>
      </div>
      
      {/* Section 4: Code Snippets */}
      <div className={sectionClasses}>
          <h2 className={sectionTitleClasses}><Code size={24} className="text-[#F97316]" /><span>Code Snippets</span></h2>
          <div className="space-y-8">
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Starter Code</span><span className="text-xs font-normal bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 px-2 py-0.5 rounded-full">Boilerplate for users</span>
                  </h3>
                  <div className="space-y-4">
                      {starterCodeFields.map((field, index) => (<div key={field.id} className={subCardClasses}><div className="flex justify-between items-center mb-4"><p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC]">Language Snippet #{index + 1}</p><button type="button" onClick={() => removeStarterCode(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button></div><div className="space-y-4"><div><label className={labelClasses}>Language</label><select {...register(`starterCode.${index}.language`, { required: 'Language is required' })} className={inputBaseClasses}>{codeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}</select></div><div><label className={labelClasses}>Header Code (optional)</label><textarea {...register(`starterCode.${index}.headerCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[80px]`} /></div><div><label className={labelClasses}>Main Code Block</label><textarea {...register(`starterCode.${index}.code`, { required: 'Code block is required' })} className={`${inputBaseClasses} font-mono text-sm min-h-[150px]`} />{errors.starterCode?.[index]?.code && <p className={errorClasses}>{errors.starterCode[index].code.message}</p>}</div><div><label className={labelClasses}>Footer/Main Code (optional)</label><textarea {...register(`starterCode.${index}.mainCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[80px]`} /></div></div></div>))}
                      <button type="button" onClick={() => appendStarterCode({ language: 'javascript', headerCode: '', code: '', mainCode: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Starter Code</span></button>
                  </div>
              </div>
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Reference Solution</span><span className="text-xs font-normal bg-purple-100 text-purple-700 dark:bg-purple-700/30 dark:text-purple-300 px-2 py-0.5 rounded-full">Internal solution</span>
                  </h3>
                  <div className="space-y-4">
                      {refSolutionFields.map((field, index) => (<div key={field.id} className={subCardClasses}><div className="flex justify-between items-center mb-4"><p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC]">Solution #{index + 1}</p><button type="button" onClick={() => removeRefSolution(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button></div><div className="space-y-4"><div><label className={labelClasses}>Language</label><select {...register(`referenceSolution.${index}.language`, { required: 'Language is required' })} className={inputBaseClasses}>{codeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}</select></div><div><label className={labelClasses}>Solution Code</label><textarea {...register(`referenceSolution.${index}.solutionCode`, { required: 'Solution code is required' })} className={`${inputBaseClasses} font-mono text-sm min-h-[200px]`} />{errors.referenceSolution?.[index]?.solutionCode && <p className={errorClasses}>{errors.referenceSolution[index].solutionCode.message}</p>}</div></div></div>))}
                      <button type="button" onClick={() => appendRefSolution({ language: 'javascript', solutionCode: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Reference Solution</span></button>
                  </div>
              </div>
          </div>
      </div>

      {/* Final Buttons */}
      <div className="flex justify-end items-center space-x-4 pt-4">
        <button type="button" onClick={() => navigate(-1)} className="py-2.5 px-5 rounded-lg font-semibold text-sm border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isDirty}
          className="group flex items-center space-x-2 py-3 px-6 rounded-lg bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
        >
          <span>Update Problem</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

export default UpdateProblem;