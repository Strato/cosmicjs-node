"use strict";

var axios = require('axios');

var init = function init(config) {
  // Accept Encoding in Node
  if (typeof window === 'undefined') {
    axios.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate';
  }

  if (config && config.token) {
    axios.defaults.headers.common.Authorization = config.token;
  }
};

var requestHandler = function requestHandler(method, url, data, headers) {
  var config = {
    method: method,
    url: url,
    data: data,
    headers: headers
  };
  return axios(config).then(function (response) {
    return response.data;
  })["catch"](function (error) {
    throw error.response ? error.response.data : error.response;
  });
};

module.exports = {
  init: init,
  requestHandler: requestHandler
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJheGlvcyIsInJlcXVpcmUiLCJpbml0IiwiY29uZmlnIiwid2luZG93IiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwidG9rZW4iLCJBdXRob3JpemF0aW9uIiwicmVxdWVzdEhhbmRsZXIiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwidGhlbiIsInJlc3BvbnNlIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvcmVxdWVzdF9oYW5kbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuXG5jb25zdCBpbml0ID0gKGNvbmZpZykgPT4ge1xuICAvLyBBY2NlcHQgRW5jb2RpbmcgaW4gTm9kZVxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBheGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnQWNjZXB0LUVuY29kaW5nJ10gPSAnZ3ppcCwgZGVmbGF0ZSdcbiAgfVxuICBpZiAoY29uZmlnICYmIGNvbmZpZy50b2tlbikge1xuICAgIGF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gPSBjb25maWcudG9rZW5cbiAgfVxufVxuXG5jb25zdCByZXF1ZXN0SGFuZGxlciA9IChtZXRob2QsIHVybCwgZGF0YSwgaGVhZGVycykgPT4ge1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgbWV0aG9kLFxuICAgIHVybCxcbiAgICBkYXRhLFxuICAgIGhlYWRlcnNcbiAgfVxuICByZXR1cm4gYXhpb3MoY29uZmlnKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhXG4gIH0pLmNhdGNoKChlcnJvcikgPT4geyBcbiAgICB0aHJvdyAoZXJyb3IucmVzcG9uc2UgPyBlcnJvci5yZXNwb25zZS5kYXRhIDogZXJyb3IucmVzcG9uc2UpXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0LFxuICByZXF1ZXN0SGFuZGxlclxufVxuIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBckI7O0FBRUEsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQ0MsTUFBRCxFQUFZO0VBQ3ZCO0VBQ0EsSUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0lBQ2pDSixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsT0FBZixDQUF1QkMsTUFBdkIsQ0FBOEIsaUJBQTlCLElBQW1ELGVBQW5EO0VBQ0Q7O0VBQ0QsSUFBSUosTUFBTSxJQUFJQSxNQUFNLENBQUNLLEtBQXJCLEVBQTRCO0lBQzFCUixLQUFLLENBQUNLLFFBQU4sQ0FBZUMsT0FBZixDQUF1QkMsTUFBdkIsQ0FBOEJFLGFBQTlCLEdBQThDTixNQUFNLENBQUNLLEtBQXJEO0VBQ0Q7QUFDRixDQVJEOztBQVVBLElBQU1FLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBQ0MsTUFBRCxFQUFTQyxHQUFULEVBQWNDLElBQWQsRUFBb0JQLE9BQXBCLEVBQWdDO0VBQ3JELElBQU1ILE1BQU0sR0FBRztJQUNiUSxNQUFNLEVBQU5BLE1BRGE7SUFFYkMsR0FBRyxFQUFIQSxHQUZhO0lBR2JDLElBQUksRUFBSkEsSUFIYTtJQUliUCxPQUFPLEVBQVBBO0VBSmEsQ0FBZjtFQU1BLE9BQU9OLEtBQUssQ0FBQ0csTUFBRCxDQUFMLENBQWNXLElBQWQsQ0FBbUIsVUFBQ0MsUUFBRCxFQUFjO0lBQ3RDLE9BQU9BLFFBQVEsQ0FBQ0YsSUFBaEI7RUFDRCxDQUZNLFdBRUUsVUFBQ0csS0FBRCxFQUFXO0lBQ2xCLE1BQU9BLEtBQUssQ0FBQ0QsUUFBTixHQUFpQkMsS0FBSyxDQUFDRCxRQUFOLENBQWVGLElBQWhDLEdBQXVDRyxLQUFLLENBQUNELFFBQXBEO0VBQ0QsQ0FKTSxDQUFQO0FBS0QsQ0FaRDs7QUFjQUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0VBQ2ZoQixJQUFJLEVBQUpBLElBRGU7RUFFZlEsY0FBYyxFQUFkQTtBQUZlLENBQWpCIn0=