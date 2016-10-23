
function get_stock() {
        var stockname = document.getElementById("stock_name").value;
        $.ajax({
            url: "http://finance.google.com/finance/info",
            data: {client:"ig",q:"NASDAQ:" + stockname},
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            error: function() { alert('Data Fetching Failed!'); } }).done(function(data){
            var output = '';
            for (var property in data[0]) {
            output += property + ': ' + data[0][property]+'; ';
            }
            document.getElementById("stock_info").innerHTML=output;
        })
        };