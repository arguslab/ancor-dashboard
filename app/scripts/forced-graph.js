'use strict';

// wrap everything in a function
// to prevent scope problems
//
(function(){

  function tick() {
    path.attr('d', linkArc);
    circle.attr('transform', transform);
    text.attr('transform', transform);
  }

  // HTTP GET
  // /v1/instances
  function getEdges() {
    var links = [
      {source: 'Test1', target: 'Test2', type: 'licensing'},
      {source: 'Test1', target: 'Test3', type: 'licensing'},
      {source: 'Test3', target: 'Test1', type: 'suit'},
      {source: 'Test1', target: 'Test2', type: 'suit'},
      {source: 'Test1', target: 'Test3', type: 'suit'},
      {source: 'Test1', target: 'Test3', type: 'suit'},
      {source: 'Test1', target: 'Test2', type: 'suit'},
    ];

    var newElem = {source: 'Test5', target: 'Test2', type: 'suit'};

    links.push(newElem);
    return links;
  }

  // http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/
  var links = getEdges(),
      nodes = {};

  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });

  var width = 460,
      height = 300;

  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(60)
      .charge(-300)
      .on('tick', tick)
      .start();

  var svg = d3.select('#forceGraph').append('svg')
      .attr('width', width)
      .attr('height', height);

  // Per-type markers, as they don't inherit styles.
  svg.append('defs').selectAll('marker')
      .data(['suit', 'licensing', 'resolved'])
    .enter().append('marker')
      .attr('id', function(d) { return d; })
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
    .append('path')
      .attr('d', 'M0,-5L10,0L0,5');

  var path = svg.append('g').selectAll('path')
      .data(force.links())
    .enter().append('path')
      .attr('class', function(d) { return 'link ' + d.type; })
      .attr('marker-end', function(d) { return 'url(#' + d.type + ')'; });

  var circle = svg.append('g').selectAll('circle')
      .data(force.nodes())
    .enter().append('circle')
      .attr('r', 6)
      .call(force.drag);

  // alert user to node name on click
  circle.on('click', function(d) {
    alert(d.name);
  });

  var text = svg.append('g').selectAll('text')
      .data(force.nodes())
    .enter().append('text')
      .attr('x', 8)
      .attr('y', '.31em')
      .text(function(d) { return d.name; });

  // Use elliptical arc path segments to doubly-encode directionality.
  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
  }

  function transform(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  }

  // Freeze D3 graph instead of making it bounce around
  // on initial load
  var k = 0;
  while ((force.alpha() > 1e-2) && (k < 150)) {
    force.tick(),
    k = k + 1;
  }

})();
