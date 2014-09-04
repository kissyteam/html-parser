/**
 * tc for lexer of html-parser
 * @author yiminghe@gmail.com
 */

var HtmlParser = require('html-parser');
var Lexer = HtmlParser.Lexer;
/*jshint quotmark:false*/
describe("html parser lexer", function () {
    it("works", function () {
        var html = "<div id='z'><<a> ";
        var lexer = new Lexer(html), node;
        var nodes = [];
        while ((node = lexer.nextNode())) {
            nodes.push(node);
        }
        expect(nodes[0].nodeType).to.equal(1);
        expect(nodes[0].nodeName).to.equal('div');
        expect(nodes[0].attributes.length).to.equal(1);
        expect(nodes[0].attributes[0].name).to.equal('id');
        expect(nodes[0].attributes[0].value).to.equal("z");
        expect(nodes[0].toHtml()).to.equal("<div id='z'>");
        expect(nodes[1].nodeType).to.equal(3);
        expect(nodes[1].toHtml()).to.equal("<");
        expect(nodes[2].nodeType).to.equal(1);
        expect(nodes[2].nodeName).to.equal("a");
        expect(nodes[2].toHtml()).to.equal("<a>");
    });

    it('can detect syntax error about tag in strict mode', function () {
        var html = "<div \n " +
            "a='b'";
        var lexer = new Lexer(html, {
            strict: true
        });
        expect(function () {
            lexer.nextNode();
        }).to.throw('div syntax error at row 2 , col 7');
        html = "</div";
        lexer = new Lexer(html, {
            strict: true
        });
        expect(function () {
            lexer.nextNode();
        }).to.throw('/div syntax error at row 1 , col 6');
        html = "<div>";
        lexer = new Lexer(html, {
            strict: true
        });
        var node = lexer.nextNode();
        expect(node.nodeName).to.equal('div');
    });

    it("works for isSelfClosed", function () {
        var html = "<z/>x";
        var lexer = new Lexer(html), node;
        var nodes = [];
        while ((node = lexer.nextNode())) {
            nodes.push(node);
        }
        expect(nodes.length).to.equal(2);
        expect(nodes[0].tagName).to.equal("z");
        expect(nodes[0].isSelfClosed).to.equal(true);
    });

    it("works for <br/>", function () {
        var html = "<br/>";
        var lexer = new Lexer(html), node;
        var nodes = [];
        while ((node = lexer.nextNode())) {
            nodes.push(node);
        }
        expect(nodes.length).to.equal(1);
        expect(nodes[0].tagName).to.equal("br");
        expect(nodes[0].isSelfClosed).to.equal(true);
    });

    it("works when encounter invalid attribute value", function () {
        var html = '<a href="http://g.cn/"">1</a>';
        var lexer = new Lexer(html), node;
        var nodes = [];
        while ((node = lexer.nextNode())) {
            nodes.push(node);
        }
        node = nodes[0];
        expect(nodes.length).to.equal(3);
        var attributes = node.attributes;
        expect(attributes.length).to.equal(1);
        expect(attributes[0].name).to.equal('href');
        expect(attributes[0].value).to.equal('http://g.cn/');
    });

});