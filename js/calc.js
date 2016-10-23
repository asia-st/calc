(function() {

  var operationBuffor;
  var currentOperation;
  var reset_flag = 1;

  function Operation() {
      this.value;
  }
  Operation.prototype.execute = function() {
      operationBuffor = $('#result').text();
      reset_flag = 1;
      currentOperation = this;
  }

  function AddOperation() {}
  AddOperation.prototype = new Operation();
  AddOperation.prototype.result = function() {
      operation_result = parseFloat(operationBuffor) + parseFloat($('#result').text());
      $('#result').text(operation_result);
  }
  function SubtractOperation() {}
  SubtractOperation.prototype = new Operation();
  SubtractOperation.prototype.result = function() {
      operation_result = parseFloat(operationBuffor) - parseFloat($('#result').text());
      $('#result').text(operation_result);
  }
  function MultiplyOperation() {}
  MultiplyOperation.prototype = new Operation();
  MultiplyOperation.prototype.result = function() {
      operation_result = parseFloat(operationBuffor) * parseFloat($('#result').text());
      $('#result').text(operation_result);
  }
  function DivOperation() {}
  DivOperation.prototype = new Operation();
  DivOperation.prototype.result = function() {
      operation_result = parseFloat(operationBuffor) / parseFloat($('#result').text());
      $('#result').text(operation_result);
  }
  function AddOperation() {}
  AddOperation.prototype = new Operation();
  AddOperation.prototype.result = function() {
      operation_result = parseFloat(operationBuffor) + parseFloat($('#result').text());
      $('#result').text(operation_result);
  }
  function NumericOperation() {}
  NumericOperation.prototype = new Operation();
  NumericOperation.prototype.execute = function() {
    if (reset_flag){
        $('#result').text("");
        reset_flag = 0;
    }
    $('#result').text($('#result').text() + "" + this.value);
  }

  function CommaOperation() {}
  CommaOperation.prototype = new Operation();
  CommaOperation.prototype.execute = function() {
      $('#result').text($('#result').text() + ".");
  }

  function PowOperation() {}
  PowOperation.prototype = new Operation();
  PowOperation.prototype.execute = function() {
      operationBuffor = 0;
      operation_result = parseFloat($('#result').text()) * parseFloat($('#result').text());
      $('#result').text(operation_result);
  }

  function SqrtOperation() {}
  SqrtOperation.prototype = new Operation();
  SqrtOperation.prototype.execute = function() {
      operationBuffor = 0;
      operation_result = Math.sqrt(parseFloat($('#result').text()));
      $('#result').text(operation_result);
  }

  function EqualOperation() {}
  EqualOperation.prototype = new Operation();
  EqualOperation.prototype.execute = function() {
      currentOperation.result();
  }
  function ClearOperation() {}
  ClearOperation.prototype = new Operation();
  ClearOperation.prototype.execute = function() {
      tmpBuffor = 0;
      $('#result').text("0");
      reset_flag = 1;
  }

  function ChangeSignOperation() {}
  ChangeSignOperation.prototype = new Operation();
  ChangeSignOperation.prototype.execute = function() {
      $('#result').text( parseFloat($('#result').text()) *(-1));
  }

  var operations = {
      add: new AddOperation(),
      subtract: new SubtractOperation(),
      multiply: new MultiplyOperation(),
      div: new DivOperation(),
      sqrt : new SqrtOperation(),
      pow : new PowOperation(),
      numeric: new NumericOperation(),
      clear: new ClearOperation(),
      change_sign: new ChangeSignOperation(),
      equal: new EqualOperation(),
      comma : new CommaOperation(),
  };
  var result = $('#result');
  $(".btn").click(function() {
      var option = $(this).attr("strategy");
      var currentOption = operations[option];
      currentOption.value = $(this).text();
      currentOption.execute();
  });

}())
