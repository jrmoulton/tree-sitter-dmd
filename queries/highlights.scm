
(function) @function
(integer) @number
(identifier) @variable
(let_statement 
  (identifier) @variable)
(call
  (identifier) @function)
(parameter_list
  (identifier) @variable)
(comment) @comment
(string) @string

[
"if"
"else"
] @conditional

[
"true"
"false"
] @boolean

[
"let"
"return"
] @keyword

[
"fn"
] @keyword.function

; Punctuation
[
","
";"
] @punctuation.delimiter

; Brackets
[
"("
")"
"["
"]"
"{"
"}"
] @punctuation.bracket

[
"+"
"-"
"*"
"/"
">"
"<"
"=="
"!=" 
] @operator

