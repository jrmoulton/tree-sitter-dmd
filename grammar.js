module.exports = grammar({
  name: "monkey",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat(choice($._statement, $.comment)),
    _statement: ($) =>
      prec(
        9,
        seq(
          choice(
            $.let_statement,
            $.return_statement,
            $._expression,
          ),
          optional(";"),
        ),
      ),
    let_statement: ($) => seq("let", $.identifier, "=", $._expression),
    comment: (_$) => seq("//", /.*/),
    return_statement: ($) => seq("return", $._expression),
    if_expression: ($) =>
      seq("if", $.condition, $.consequence, optional($.alternative)),
    condition: ($) => $._expression,
    consequence: ($) => seq("{", repeat($._statement), "}"),
    alternative: ($) => seq("else", "{", repeat($._statement), "}"),
    identifier: (_$) => /[a-zA-Z]+[a-zA-Z0-9]*/,
    call: ($) => seq($.identifier, $.argument_list),
    array: ($) =>
      seq(
        "[",
        repeat(choice(seq($._expression, optional(",")), $._expression)),
        "]",
      ),
    string: (_$) => seq('"', /[^"]*/, '"'),
    function: ($) => seq("fn", $.parameter_list, $.function_body),
    function_body: ($) => seq("{", repeat($._statement), "}"),
    parameter_list: ($) =>
      seq(
        "(",
        repeat(choice(seq($.identifier, optional(",")), $.identifier)),
        ")",
      ),
    argument_list: ($) =>
      seq(
        "(",
        repeat(choice(seq($._expression, optional(",")), $._expression)),
        ")",
      ),
    _expression: ($) =>
      prec.left(choice(
        $.call,
        $.array,
        $.string,
        $.function,
        $.boolean,
        $.binary_operator,
        $.unary_operator,
        $.integer,
        $.if_expression,
        $.identifier,
      )),
    boolean: (_$) => choice("true", "false"),
    unary_operator: ($) => seq(choice("-"), $._expression),
    binary_operator: ($) =>
      prec.left(
        10,
        seq(
          $._expression,
          choice("+", "-", "*", "/", ">", "<", "==", "!="),
          $._expression,
        ),
      ),
    integer: (_$) => /\d+/,
  },
});
