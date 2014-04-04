'use strict';

// wrap everything in a function
// to prevent scope problems
//
window.setupForcedGraph = function(instances) {

  function tick() {
    path.attr('d', linkArc);
    circle.attr('transform', transform);
    text.attr('transform', transform);
  }

  // http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/
  //var links = getEdges(),
  var links = instances,
      nodes = {};


  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });

  var width = 660,
      height = 450;

  var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(210)
      .charge(-1000)
      .on('tick', tick)
      .start();

  var svg = d3.select('#forceGraph').append('svg')
      .attr('width', width)
      .attr('height', height);

  // Per-type markers, as they don't inherit styles.
  svg.append('defs').selectAll('marker')
      .data(['direct', 'test', 'resolved'])
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
      .attr('r', 10)
      .call(force.drag);

  // Iterates through instaces to obtain node id
  function returnLinkId(name) {
    for (var elem in links) {
      // console.log(links[elem]);
      if (links[elem].source.name === name) {
        return links[elem].sid;
      }
    }
  }

  // alert user to node name on click
  //
  // css class hide on click
  circle.on('click', function(d) {
    // console.log(links[d.name]);
    var sourceId = returnLinkId(d.name);
    console.log('Node Name: ' + d.name + '\nNode ID: ' + sourceId);
  });

  var text = svg.append('g').selectAll('text')
      .data(force.nodes())
    .enter().append('text')
      .attr('x', 25)
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
    force.tick();
    k++;
  }

};
