
//Landsat-8 Images



//Parks Polygons



//Dog Friednly 


//ndvi date range
var ndvi_2014 = C_imgCollection.filterDate('2014-01-01', '2014-12-30').median();
var ndvi_2015 = C_imgCollection.filterDate('2015-01-01', '2015-12-30').median();

//Map.addLayer(allparks);
var diff_ndvi = ndvi_2015.subtract(ndvi_2014);

//Buffer Function
var buff = function(feature){
  return feature.buffer(100);
};

//Park area buffer
var bufferPark = dogfriendly.map(buff);

//Display dog friendly parks
//Map.addLayer(bufferPark);
Map.addLayer(dogfriendly,{color:'ff0000'});


//Selecting dog friendly Parks
var ParksC = allparks.filterBounds(bufferPark);

//Display dog friendly Parks
//Map.addLayer(ParksC,{color:'fdcc00'});  

var clippark2 =diff_ndvi.clip(ParksC)


var ndvi_palette =
    'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
    '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
    
    
Map.addLayer(clippark2,{palette: 'FF0000, 000000, 00FF00 ', min: -0.15, max: 0.15});

//Getting data 
var average = ParksC.map(function(feature) {
  var change = diff_ndvi.reduceRegion(ee.Reducer.mean(), feature.geometry(), 30);
  return feature.set({'change': change});
});
//print(average);


//Print Names and ndvi difference 
var feature_data = average.getInfo().features;
for (var i = 0; i < feature_data.length; ++i) {
  var park_n = feature_data[i].properties;
  print(park_n.name+ ': ' + park_n.change.NDVI);
}
    
