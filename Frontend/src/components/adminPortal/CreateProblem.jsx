import React from 'react';
import { useNavigate } from 'react-router';
import axiosClient from "../../config/axios";
import { useForm, useFieldArray } from 'react-hook-form';
import {
  PlusCircle, Trash2, X, ArrowRight,
  FileJson, Code, List, Tag, Building,
  Lightbulb, AlertCircle, MessageSquare
} from 'lucide-react'; // Added MessageSquare for Examples

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

const CreateProblem = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      title: '',
      problemNo: undefined,
      description: '',
      difficulty: "Easy",
      tags: [],
      companies: [],
      hints: [],
      constraints: [],
      starterCode: [],
      referenceSolution: [],
      examples: [], // New field from schema
      visibleTestCases: [],
      hiddenTestCases: [],
    }
  });

  const tags = watch('tags');

  const { fields: constraintFields, append: appendConstraint, remove: removeConstraint } = useFieldArray({ control, name: 'constraints' });
  const { fields: companyFields, append: appendCompany, remove: removeCompany } = useFieldArray({ control, name: 'companies' });
  const { fields: hintFields, append: appendHint, remove: removeHint } = useFieldArray({ control, name: 'hints' });
  const { fields: exampleFields, append: appendExample, remove: removeExample } = useFieldArray({ control, name: 'examples' }); // New useFieldArray
  const { fields: visibleTCFields, append: appendVisibleTC, remove: removeVisibleTC } = useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenTCFields, append: appendHiddenTC, remove: removeHiddenTC } = useFieldArray({ control, name: 'hiddenTestCases' });
  const { fields: starterCodeFields, append: appendStarterCode, remove: removeStarterCode } = useFieldArray({ control, name: 'starterCode' });
  const { fields: refSolutionFields, append: appendRefSolution, remove: removeRefSolution } = useFieldArray({ control, name: 'referenceSolution' });

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag], { shouldValidate: true });
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove), { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      // Transform data to match the updated Mongoose schema
      const payload = {
        ...data,
        constraints: data.constraints.map(c => c.value.trim()).filter(Boolean),
        companies: data.companies.map(c => c.value.trim()).filter(Boolean),
        hints: data.hints.map(h => h.value.trim()).filter(Boolean),
        
        // New 'examples' mapping
        examples: data.examples.map(ex => ({
            input: ex.input.trim(),
            output: ex.output.trim(),
            explanation: ex.explanation.trim(),
        })),
        
        // Updated 'visibleTestCases' mapping
        visibleTestCases: data.visibleTestCases.map(tc => ({
            input: tc.input.trim(),
            output: tc.output.trim(),
        })),

        // Updated 'hiddenTestCases' mapping
        hiddenTestCases: data.hiddenTestCases.map(tc => ({
            input: tc.input.trim(),
            output: tc.output.trim(),
        })),

        starterCode: data.starterCode.map(sc => ({
            language: sc.language.trim(),
            headerCode: sc.headerCode.trim(),
            code: sc.code.trim(),
            mainCode: sc.mainCode.trim(),
        })),
        referenceSolution: data.referenceSolution.map(rs => ({
            language: rs.language.trim(),
            solutionCode: rs.solutionCode.trim(),
        }))
      };

      console.log("Formatted Problem Data:", payload);
      const response = await axiosClient.post("/problems/create", payload);
      console.log(response.data);
      alert('Problem created successfully');
    } catch (error) {
      console.log(error);
    }
  };

  // Classname replacements
  const inputBaseClasses = "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-2.5 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const labelClasses = "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
  const sectionClasses = "bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm";
  const sectionTitleClasses = "flex items-center space-x-3 text-xl font-bold border-b border-[#E2E8F0] dark:border-[#334155] pb-4 mb-6 text-[#0F172A] dark:text-[#F8FAFC]";
  const subCardClasses = "p-4 bg-[#F1F5F9] dark:bg-[#0F172A] rounded-xl border border-[#E2E8F0] dark:border-[#334155]/50 transition-all duration-300 hover:border-[#F97316]/30";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Section 1: Basic Information (Unchanged) */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><List size={24} className="text-[#F97316]" /><span>Basic Information</span></h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className={labelClasses}>Title</label>
              <input type="text" id="title" {...register('title', { required: 'Title is required' })} className={inputBaseClasses} placeholder="e.g., Two Sum" />
              {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="problemNo" className={labelClasses}>Problem Number</label>
              <input type="number" id="problemNo" {...register('problemNo', { required: 'Problem number is required', valueAsNumber: true, min: { value: 1, message: "Problem number must be at least 1" } })} className={inputBaseClasses} placeholder="e.g., 1" />
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
            <textarea id="description" {...register('description', { required: 'Description is required' })} className={`${inputBaseClasses} min-h-[150px]`} placeholder="Describe the problem in detail..." />
            {errors.description && <p className={errorClasses}>{errors.description.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Metadata (Unchanged) */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><Tag size={24} className="text-[#F97316]" /><span>Metadata</span></h2>
        {/* ... (This section is identical to the previous version) ... */}
        <div className="space-y-8">
          <div>
            <label htmlFor="tags-select" className={labelClasses}>Tags</label>
            <select id="tags-select" onChange={e => { handleAddTag(e.target.value); e.target.value = ''; }} className={inputBaseClasses} defaultValue="">
              <option value="" disabled>Select a tag to add...</option>
              {problemTags.filter(t => !tags.includes(t)).map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <div className={`flex flex-wrap items-center gap-2 mt-3 p-2 min-h-[42px] rounded-lg ${inputBaseClasses} bg-[#F1F5F9] dark:bg-[#0F172A]`}>
              <input type="hidden" {...register('tags', { validate: value => value.length > 0 || 'At least one tag is required' })} />
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
                <input type="hidden" {...register(name, { validate: (value) => !required || value.length > 0 || required })}/>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input {...register(`${name}.${index}.value`)} className={inputBaseClasses} placeholder={`${placeholder} #${index + 1}`} />
                    <button type="button" onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => append()} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]">
                <PlusCircle size={18} />
                <span>Add {label.slice(0, -1)}</span>
              </button>
               {errors[name] && <p className={errorClasses}>{errors[name].message}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Examples & Test Cases (UPDATED) */}
      <div className={sectionClasses}>
          <h2 className={sectionTitleClasses}><FileJson size={24} className="text-[#F97316]" /><span>Examples & Test Cases</span></h2>
          <div className="space-y-8">
              {/* NEW Examples Section */}
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <MessageSquare size={20} />
                      <span>Examples</span>
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
                                  <div>
                                      <label className={labelClasses}>Input</label>
                                      <textarea {...register(`examples.${index}.input`, { required: 'Input is required' })} className={`${inputBaseClasses} font-mono text-sm`} placeholder='e.g., nums = [2,7,11,15]' />
                                      {errors.examples?.[index]?.input && <p className={errorClasses}>{errors.examples[index].input.message}</p>}
                                  </div>
                                  <div>
                                      <label className={labelClasses}>Output</label>
                                      <textarea {...register(`examples.${index}.output`)} className={`${inputBaseClasses} font-mono text-sm`} placeholder='e.g., [0,1]' />
                                  </div>
                                  <div>
                                      <label className={labelClasses}>Explanation</label>
                                      <textarea {...register(`examples.${index}.explanation`, { required: 'Explanation is required' })} className={`${inputBaseClasses}`} placeholder='e.g., Because nums[0] + nums[1] == 9, we return [0, 1].' />
                                      {errors.examples?.[index]?.explanation && <p className={errorClasses}>{errors.examples[index].explanation.message}</p>}
                                  </div>
                              </div>
                          </div>
                      ))}
                      <button type="button" onClick={() => appendExample({ input: '', output: '', explanation: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Example</span></button>
                  </div>
              </div>

              {/* UPDATED Visible Test Cases Section */}
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Visible Test Cases</span>
                      <span className="text-xs font-normal bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 px-2 py-0.5 rounded-full">For basic checks</span>
                  </h3>
                  <div className="space-y-4">
                      {visibleTCFields.map((field, index) => (
                           <div key={field.id} className={subCardClasses}>
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC] pt-2">Visible Case #{index + 1}</p>
                                <button type="button" onClick={() => removeVisibleTC(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className={labelClasses}>Input</label>
                                    <textarea {...register(`visibleTestCases.${index}.input`, { required: 'Input is required' })} className={`${inputBaseClasses} font-mono text-sm`} placeholder='e.g., nums = [3,2,4]' />
                                    {errors.visibleTestCases?.[index]?.input && <p className={errorClasses}>{errors.visibleTestCases[index].input.message}</p>}
                                  </div>
                                  <div>
                                    <label className={labelClasses}>Output</label>
                                    <textarea {...register(`visibleTestCases.${index}.output`)} className={`${inputBaseClasses} font-mono text-sm`} placeholder='e.g., [1,2]' />
                                  </div>
                              </div>
                          </div>
                      ))}
                      <button type="button" onClick={() => appendVisibleTC({ input: '', output: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Visible Test Case</span></button>
                  </div>
              </div>

              {/* UPDATED Hidden Test Cases Section */}
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Hidden Test Cases</span>
                      <span className="text-xs font-normal bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300 px-2 py-0.5 rounded-full">Used for judging</span>
                  </h3>
                  <div className="space-y-4">
                      {hiddenTCFields.map((field, index) => (
                          <div key={field.id} className={subCardClasses}>
                              <div className="flex justify-between items-start mb-2">
                                <p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC] pt-2">Hidden Case #{index + 1}</p>
                                <button type="button" onClick={() => removeHiddenTC(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                              </div>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className={labelClasses}>Input</label>
                                    <textarea {...register(`hiddenTestCases.${index}.input`, { required: 'Input is required' })} className={`${inputBaseClasses} font-mono text-sm`} placeholder='e.g., nums = [-1,-1,-1]' />
                                    {errors.hiddenTestCases?.[index]?.input && <p className={errorClasses}>{errors.hiddenTestCases[index].input.message}</p>}
                                  </div>
                                  <div>
                                    <label className={labelClasses}>Output</label>
                                    <textarea {...register(`hiddenTestCases.${index}.output`)} className={`${inputBaseClasses} font-mono text-sm`} placeholder='e.g., [0,1]' />
                                  </div>
                              </div>
                          </div>
                      ))}
                      <button type="button" onClick={() => appendHiddenTC({ input: '', output: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Hidden Test Case</span></button>
                  </div>
              </div>
          </div>
      </div>

      {/* Section 4: Code Snippets (Unchanged) */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><Code size={24} className="text-[#F97316]" /><span>Code Snippets</span></h2>
        {/* ... (This section is identical to the previous version) ... */}
         <div className="space-y-8">
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Starter Code</span>
                      <span className="text-xs font-normal bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 px-2 py-0.5 rounded-full">Boilerplate for users</span>
                  </h3>
                  <div className="space-y-4">
                      {starterCodeFields.map((field, index) => (
                          <div key={field.id} className={subCardClasses}>
                              <div className="flex justify-between items-center mb-4">
                                  <p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC]">Language Snippet #{index + 1}</p>
                                  <button type="button" onClick={() => removeStarterCode(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                              </div>
                              <div className="space-y-4">
                                  <div>
                                      <label className={labelClasses}>Language</label>
                                      <select {...register(`starterCode.${index}.language`, { required: 'Language is required' })} className={inputBaseClasses}>
                                          {codeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                      </select>
                                  </div>
                                  <div><label className={labelClasses}>Header Code (optional)</label><textarea {...register(`starterCode.${index}.headerCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[80px]`} placeholder="e.g., #include <vector>" /></div>
                                  <div>
                                      <label className={labelClasses}>Main Code Block</label>
                                      <textarea {...register(`starterCode.${index}.code`, { required: 'Code block is required' })} className={`${inputBaseClasses} font-mono text-sm min-h-[150px]`} placeholder="e.g., class Solution { ... }" />
                                      {errors.starterCode?.[index]?.code && <p className={errorClasses}>{errors.starterCode[index].code.message}</p>}
                                  </div>
                                  <div><label className={labelClasses}>Footer/Main Code (optional)</label><textarea {...register(`starterCode.${index}.mainCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[80px]`} placeholder="Code to call the main function for testing" /></div>
                              </div>
                          </div>
                      ))}
                      <button type="button" onClick={() => appendStarterCode({ language: 'javascript', headerCode: '', code: '', mainCode: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Starter Code</span></button>
                  </div>
              </div>
              <div>
                  <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                      <span>Reference Solution</span>
                      <span className="text-xs font-normal bg-purple-100 text-purple-700 dark:bg-purple-700/30 dark:text-purple-300 px-2 py-0.5 rounded-full">Internal solution</span>
                  </h3>
                  <div className="space-y-4">
                      {refSolutionFields.map((field, index) => (
                          <div key={field.id} className={subCardClasses}>
                              <div className="flex justify-between items-center mb-4">
                                <p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC]">Solution #{index + 1}</p>
                                <button type="button" onClick={() => removeRefSolution(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                              </div>
                              <div className="space-y-4">
                                  <div>
                                      <label className={labelClasses}>Language</label>
                                      <select {...register(`referenceSolution.${index}.language`, { required: 'Language is required' })} className={inputBaseClasses}>
                                          {codeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                                      </select>
                                  </div>
                                  <div>
                                      <label className={labelClasses}>Solution Code</label>
                                      <textarea {...register(`referenceSolution.${index}.solutionCode`, { required: 'Solution code is required' })} className={`${inputBaseClasses} font-mono text-sm min-h-[200px]`} placeholder="Complete solution code..." />
                                      {errors.referenceSolution?.[index]?.solutionCode && <p className={errorClasses}>{errors.referenceSolution[index].solutionCode.message}</p>}
                                  </div>
                              </div>
                          </div>
                      ))}
                      <button type="button" onClick={() => appendRefSolution({ language: 'javascript', solutionCode: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Reference Solution</span></button>
                  </div>
              </div>
          </div>
      </div>


      {/* Final Buttons */}
      <div className="flex justify-end items-center space-x-4 pt-4">
        <button type="button" onClick={() => navigate(-1)} className="py-2.5 px-5 rounded-lg font-semibold text-sm border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 transition-colors">Cancel</button>
        <button type="submit" className="group flex items-center space-x-2 py-3 px-6 rounded-lg bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
          <span>Create Problem</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

export default CreateProblem;