function tokenize(content, delimiter)
{
    replaced = content.replace(/[\r\n]/g, '')
    modified = replaced.split(delimiter || ' ').map(s => (s).trim());
    console.log(modified)
    return modified;
}

function tsv()
{
    text = $("#TSV").val();
    console.log(text)
    text = text.replace(/[\r\n]/g, '')
    textArr = text.split('\t');
    console.log(textArr)
    $("#leftContent").val(textArr[1]);
    $("#rightContent").val(textArr[3]);
}

function addToDOM(symbol, content)
{
    html = `<tr>
                <th scope="row">${symbol}</th>
                <td>${content}</td>
            </tr>`;
    $("#list").append(html);
}

function diffIt() {
    $("#diffPane").hide()
    $("#list").html("");
    left = tokenize($("#leftContent").val(), $("#delimit").val())
    right = tokenize($("#rightContent").val(), $("#delimit").val())

    removed = left.filter(x => right.indexOf(x) < 0)
    added = right.filter(x => left.indexOf(x) < 0)

    merged = removed.map(x => ['-', x]).concat(added.map(x => ['+', x]));
    console.log(merged);

    merged.sort(function(a,b) {
        if (a[1] === b[1]) {
            return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
        });

    merged.forEach(x => addToDOM(x[0], x[1]))
    $("#diffPane").show()
}