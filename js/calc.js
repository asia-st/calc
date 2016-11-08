(function() {

  var Calculator = {

      operationBuffor : 0,
      actual_result : 0,
      currentOperation : 0,
      reset_flag : 1,
      binary_system : null,

      set_result : function(result){
          var value  = Calculator.binary_system.toOwnSystem(result);
          $('#result').text(value);
      },

      get_result : function (){
          return Calculator.binary_system.toDec($('#result').text());
      }
  }



  function NumeralSystem() {}
  function DecSystem() {}
  DecSystem.prototype = new NumeralSystem();
  DecSystem.prototype.execute = function() {
    $("button[strategy=numeric]").attr("disabled",false);
    $("button[strategy=numeric]").each(function(){
        if ($(this).text() >='A' && $(this).text() <='F'){
            $(this).attr("disabled", true);
        }
    });

    $('#result').text(Calculator.binary_system.toDec($('#result').text()).toString(10));


    Calculator.binary_system = this;
  }
  DecSystem.prototype.toDec = function(value){
      return parseInt(value);
  }
  DecSystem.prototype.toOwnSystem = function(value){
    return value.toString(10);
  }


  function BinSystem() {}
  BinSystem.prototype = new NumeralSystem();

  BinSystem.prototype.execute = function() {
    $("button[strategy=numeric]").attr("disabled",false);
    $("button[strategy=numeric]").each(function(){
        if ($(this).text() >='A' && $(this).text() <='F'){
            $(this).attr("disabled", true);
        }
        if ($(this).text() >='2' && $(this).text() <='9'){
            $(this).attr("disabled", true);
        }
    });

    $('#result').text(Calculator.binary_system.toDec($('#result').text()).toString(2));

    Calculator.binary_system = this;
  }
  BinSystem.prototype.toDec = function(value){
      return parseInt(value, 2);
  }
  BinSystem.prototype.toOwnSystem = function(value){
    return value.toString(2);
  }

  function HexSystem() {}
  HexSystem.prototype = new NumeralSystem();
  HexSystem.prototype.execute = function() {
    $("button[strategy=numeric]").attr("disabled",false);

    $('#result').text(Calculator.binary_system.toDec($('#result').text()).toString(16));
    Calculator.binary_system = this;
  }
  HexSystem.prototype.toDec = function(value){
      return parseInt(value, 16);
  }
  HexSystem.prototype.toOwnSystem = function(value){
      return value.toString(16);
  }
  
  
  function OctSystem() {}
  OctSystem.prototype = new NumeralSystem();
  
  OctSystem.prototype.execute = function() {
	  $("button[strategy=numeric]").attr("disabled",false);
	  $("button[strategy=numeric]").each(function(){
        if ($(this).text() >='A' && $(this).text() <='F'){
            $(this).attr("disabled", true);
        }
        if ($(this).text() >='8' && $(this).text() <='9'){
            $(this).attr("disabled", true);
        }
    });
	$('#result').text(Calculator.binary_system.toDec($('#result').text()).toString(8));
    Calculator.binary_system = this;
  }
  
  OctSystem.prototype.toDec = function(value){
      return parseInt(value, 8);
  }
  
  OctSystem.prototype.toOwnSystem = function(value){
      return value.toString(8);
  }
  


  function Operation() {
      this.value;
  }
  Operation.prototype.execute = function() {
      Calculator.operationBuffor = Calculator.get_result();
      Calculator.reset_flag = 1;
      Calculator.currentOperation = this;
  }

  function AddOperation() {}
  AddOperation.prototype = new Operation();
  AddOperation.prototype.result = function() {
      console.log(Calculator.operationBuffor);
      console.log(Calculator.get_result());

      var operation_result = parseFloat(Calculator.operationBuffor) + Calculator.get_result();
      Calculator.set_result(operation_result);
  }
  function SubtractOperation() {}
  SubtractOperation.prototype = new Operation();
  SubtractOperation.prototype.result = function() {
      var operation_result =  parseFloat(Calculator.operationBuffor) - Calculator.get_result();
      Calculator.set_result(operation_result);
  }
  function MultiplyOperation() {}
  MultiplyOperation.prototype = new Operation();
  MultiplyOperation.prototype.result = function() {
      var operation_result =  parseFloat(Calculator.operationBuffor) * Calculator.get_result();
      Calculator.set_result(operation_result);
  }
  function DivOperation() {}
  DivOperation.prototype = new Operation();
  DivOperation.prototype.result = function() {
      var operation_result =  parseFloat(Calculator.operationBuffor) / Calculator.get_result();
      Calculator.set_result(operation_result);
  }



  function NumericOperation() {}
  NumericOperation.prototype = new Operation();
  NumericOperation.prototype.execute = function() {
    if (Calculator.reset_flag){
        $('#result').text("");
        Calculator.reset_flag = 0;
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
      operation_result =  Calculator.get_result() *  Calculator.get_result();
      Calculator.set_result(operation_result);
  }

  function SqrtOperation() {}
  SqrtOperation.prototype = new Operation();
  SqrtOperation.prototype.execute = function() {
      operationBuffor = 0;
      operation_result = Math.sqrt(Calculator.get_result());
      Calculator.set_result(operation_result);
  }

  function EqualOperation() {}
  EqualOperation.prototype = new Operation();
  EqualOperation.prototype.execute = function() {
      Calculator.currentOperation.result();
  }
  
  function ClearOperation() {}
  ClearOperation.prototype = new Operation();
  ClearOperation.prototype.execute = function() {
      Calculator.operationBuffor = 0;
      $('#result').text("0");
      reset_flag = 1;
  }

  function ChangeSignOperation() {}
  ChangeSignOperation.prototype = new Operation();
  ChangeSignOperation.prototype.execute = function() {
      operation_result =  Calculator.get_result() *  (-1);
      Calculator.set_result(operation_result);
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
      dec : new DecSystem(),
      bin : new BinSystem(),
      hex : new HexSystem(),
	  oct : new OctSystem()
  };

  Calculator.binary_system = new DecSystem();
  Calculator.binary_system.execute();

  $(".btn").click(function() {
      var option = $(this).attr("strategy");
      var currentOption = operations[option];
      currentOption.value = $(this).text();
      currentOption.execute();
  });

}())
