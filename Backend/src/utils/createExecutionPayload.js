// judge0-helper.js

/*
 * Creates a language-specific execution harness (boilerplate) by wrapping the user's code.
 * @param {string} userCode - The code submitted by the user.
 * @param {string} language - The language identifier ("Python", "Javascript", "Cpp", "Java", "C").
 * @returns {string} The full source code string ready for execution.
 */
function createHarness(userCode, language) {
  // --- Python Harness (General Purpose) ---
  if (language === 'Python') {
    return `
import sys
import ast

# User's code is pasted here
${userCode}

# --- Execution Harness ---
if __name__ == '__main__':
    # The first line of stdin is the method to call
    method_to_call = sys.stdin.readline().strip()
    
    # The second line of stdin is a list of arguments for the method
    args_str = sys.stdin.readline().strip()
    
    try:
        # Safely evaluate the string representation of arguments
        args = ast.literal_eval(args_str)
    except (ValueError, SyntaxError):
        print(f"Error parsing arguments: {args_str}")
        sys.exit(1)

    solution = Solution()
    method = getattr(solution, method_to_call)
    
    # The '*' operator unpacks the list of arguments
    result = method(*args)
    
    print(result)
`;
  }

  // --- JavaScript Harness (General Purpose) ---
  if (language === 'Javascript') {
    return `
const fs = require('fs');

// User's code is pasted here
${userCode}

// --- Execution Harness ---
function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split('\\n');
    const method_to_call = input[0];
    const args = JSON.parse(input[1]);

    // This handles both standalone functions and class-based solutions
    try {
        const solution = new Solution();
        const result = solution[method_to_call](...args);
        // Stringify to handle array/object outputs correctly
        console.log(JSON.stringify(result));
    } catch (e) {
        // Fallback for older-style LeetCode problems with global functions
        const func = this[method_to_call];
        if (typeof func === 'function') {
            const result = func(...args);
            console.log(JSON.stringify(result));
        } else {
            console.error("Could not find method to execute.");
            throw e;
        }
    }
}

main();
`;
  }
  
  // --- C Harness (Signature-Specific) ---
  if (language === 'C') {
    // C is statically typed and lacks reflection. This harness is specifically
    // designed for a function that takes `(int* nums, int numsSize)`.
    // It must be adapted for problems with different function signatures.
    return `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// User's code is pasted here
${userCode}

// --- Execution Harness ---

// Helper function to read a line of any length from stdin
char* read_line() {
    char *line = malloc(100), *linep = line;
    size_t lenmax = 100, len = lenmax;
    int c;

    if(line == NULL) return NULL;

    for(;;) {
        c = fgetc(stdin);
        if(c == EOF || c == '\\n') break;
        if(--len == 0) {
            len = lenmax;
            char *linen = realloc(linep, lenmax *= 2);
            if(linen == NULL) {
                free(linep);
                return NULL;
            }
            line = linen + (line - linep);
            linep = linen;
        }
        *line++ = c;
    }
    *line = '\\0';
    return linep;
}

// Helper to parse a string like "[[1,2,-3,4]]" into an int array
int* parse_int_array(char* s, int* size) {
    *size = 0;
    if (s == NULL || strlen(s) < 4) return NULL; // Must be at least "[[]]"

    // Find the start of the numbers
    char* p = s;
    while (*p && *p != '[') p++;
    if (*p) p++;
    while (*p && *p != '[') p++;
    if (*p) p++;

    // Count numbers to allocate memory
    int count = 0;
    char* temp = p;
    while(*temp && *temp != ']') {
        if (isdigit(*temp) || (*temp == '-' && isdigit(*(temp+1)))) {
            count++;
            while(*temp && *temp != ',') temp++;
        }
        if (*temp) temp++;
    }

    if (count == 0) return NULL;
    
    int* arr = (int*)malloc(count * sizeof(int));
    if (arr == NULL) return NULL;
    
    int i = 0;
    char *endp;
    while(*p && *p != ']' && i < count) {
        if (isdigit(*p) || (*p == '-' && isdigit(*(p+1)))) {
            arr[i++] = strtol(p, &endp, 10);
            p = endp;
        } else {
            p++;
        }
    }

    *size = i;
    return arr;
}


int main() {
    // Read and discard method name (not used in C harness)
    char* methodName = read_line();
    free(methodName);

    // Read the arguments string
    char* args_str = read_line();

    // Parse the arguments
    int numsSize = 0;
    int* nums = parse_int_array(args_str, &numsSize);
    
    // Call the user's function
    int result = pivotIndex(nums, numsSize);

    // Print the result
    printf("%d\\n", result);

    // Cleanup
    free(args_str);
    if (nums != NULL) {
        free(nums);
    }

    return 0;
}
`;
  }

  // --- Java Harness (Signature-Specific, using a switch) ---
  if (language === 'Java') {
    // Java is statically typed. This harness uses a switch on the method name
    // to call the correct method with correctly parsed arguments.
    // Add a new 'case' for each new function signature you introduce.
    return `
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

// User's 'Solution' class is pasted here
${userCode}

// --- Main execution class ---
public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        String methodName = in.readLine();
        String argsStr = in.readLine();

        Solution solution = new Solution();

        // Use a switch to handle different methods and their signatures
        switch (methodName) {
            case "pivotIndex": {
                // Parse "[[1,2,3]]" into an int[]
                int[] nums = parseIntArray(argsStr);
                int result = solution.pivotIndex(nums);
                System.out.println(result);
                break;
            }
            
            // EXAMPLE for a future problem like "twoSum([2,7,11,15], 9)"
            // case "twoSum": {
            //     Object[] args = parseGenericList(argsStr);
            //     // Manually cast and extract arguments
            //     int[] nums = ((ArrayList<Integer>) args[0]).stream().mapToInt(i -> i).toArray();
            //     int target = (int) args[1];
            //     int[] result = solution.twoSum(nums, target);
            //     System.out.println(Arrays.toString(result));
            //     break;
            // }

            default:
                System.out.println("Method not found in Java harness: " + methodName);
                break;
        }
    }

    // Helper to parse a string like "[[1,2,3]]" into an int[]
    private static int[] parseIntArray(String s) {
        // Find the inner content: "1,2,3"
        s = s.substring(s.indexOf('[') + 1);
        s = s.substring(s.indexOf('[') + 1);
        s = s.substring(0, s.indexOf(']'));
        
        if (s.isEmpty()) {
            return new int[0];
        }

        String[] items = s.split(",");
        int[] arr = new int[items.length];
        for (int i = 0; i < items.length; i++) {
            arr[i] = Integer.parseInt(items[i].trim());
        }
        return arr;
    }
}
`;
  }

  // Fallback if language not supported
  throw new Error(`Harness not implemented for language: ${language}`);
}

/*
 * Maps our internal language name to Judge0's language ID.
 * @param {string} language - e.g., "Python", "Cpp"
 * @returns {number} The corresponding Judge0 language ID.
 */
function getLanguageId(language) {
  const languageMap = {
    C: 110,
    Cpp: 105,
    Java: 91,
    Javascript: 102,
    Python: 109 
  };
  return languageMap[language] || null;
}

/*
 * Creates the final payload for a single test case to be sent to Judge0.
 * @param {object} options
 * @param {string} options.userCode - The user's submitted code.
 * @param {string} options.language - The language of the submission.
 * @param {object} options.testCase - A test case object { input, output }.
 * @param {string} options.methodName - The name of the function to call (e.g., "pivotIndex").
 * @returns {object} The JSON payload for the Judge0 API.
 */
function createExecutionPayload({ userCode, language, testCase, methodName }) {
  const language_id = getLanguageId(language);
  if (!language_id) {
    throw new Error(`Unsupported language: ${language}`);
  }

  // The new input format: first line is method name, second is arguments
  const stdin = `${methodName}\n[${testCase.input}]`;

  const source_code = createHarness(userCode, language);

  return {
    language_id,
    source_code,
    stdin,
    expected_output: testCase.output,
    cpu_time_limit: 2, // seconds
    memory_limit: 128000, // 128 MB in kilobytes
  };
}

module.exports = createExecutionPayload;