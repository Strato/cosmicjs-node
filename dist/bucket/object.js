"use strict";

var _require = require('../helpers/constants'),
    URI = _require.URI;

var HTTP_METHODS = require('../helpers/http_methods');

var _require2 = require('../helpers/request_handler'),
    requestHandler = _require2.requestHandler;

var headers;

var addParamsToObjectsEndpoint = function addParamsToObjectsEndpoint(endpoint, params) {
  if (params && params.limit) {
    endpoint += "&limit=".concat(params.limit);
  }

  if (params && params.skip) {
    endpoint += "&skip=".concat(params.skip);
  }

  if (params && params.status) {
    endpoint += "&status=".concat(params.status);
  }

  if (params && params.after) {
    endpoint += "&after=".concat(params.after);
  }

  if (params && params.sort) {
    endpoint += "&sort=".concat(params.sort);
  }

  if (params && params.show_metafields) {
    endpoint += "&show_metafields=".concat(params.show_metafields);
  }

  if (params && params.pretty) {
    endpoint += "&pretty=".concat(params.pretty);
  }

  if (params && params.props) {
    endpoint += "&props=".concat(params.props);
  }

  if (params && params.query) {
    endpoint += "&query=".concat(encodeURI(JSON.stringify(params.query)));
  }

  if (params && typeof params.use_cache !== 'undefined') {
    endpoint += "&use_cache=".concat(params.use_cache);
  }

  return endpoint;
};

var objectMethods = function objectMethods(bucket_config) {
  return {
    getObjects: function getObjects(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects?read_key=").concat(bucket_config.read_key);
      endpoint = addParamsToObjectsEndpoint(endpoint, params);
      return requestHandler(HTTP_METHODS.GET, endpoint);
    },
    getObject: function getObject(params) {
      if (!params) {
        throw new Error('Must supply params object with object id');
      }

      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id, "?read_key=").concat(bucket_config.read_key);

      if (params && params.status) {
        endpoint += "&status=".concat(params.status);
      }

      if (params && params.props) {
        endpoint += "&props=".concat(params.props);
      }

      if (params && typeof params.use_cache !== 'undefined') {
        endpoint += "&use_cache=".concat(params.use_cache);
      }

      return requestHandler(HTTP_METHODS.GET, endpoint);
    },
    getObjectRevisions: function getObjectRevisions(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id, "/revisions?read_key=").concat(bucket_config.read_key);
      endpoint = addParamsToObjectsEndpoint(endpoint, params);
      return requestHandler(HTTP_METHODS.GET, endpoint);
    },
    getMergeRequestObjects: function getMergeRequestObjects(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/merge-requests/").concat(params.id, "/objects?read_key=").concat(bucket_config.read_key);
      endpoint = addParamsToObjectsEndpoint(endpoint, params);
      return requestHandler(HTTP_METHODS.GET, endpoint);
    },
    addObject: function addObject(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects");

      if (bucket_config.write_key) {
        headers = {
          "Authorization": "Bearer ".concat(bucket_config.write_key)
        };
      }

      return requestHandler(HTTP_METHODS.POST, endpoint, params, headers);
    },
    addObjectRevision: function addObjectRevision(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id, "/revisions");
      delete params.id;
      delete params.type;

      if (bucket_config.write_key) {
        headers = {
          "Authorization": "Bearer ".concat(bucket_config.write_key)
        };
      }

      return requestHandler(HTTP_METHODS.POST, endpoint, params, headers);
    },
    editObject: function editObject(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id);

      if (bucket_config.write_key) {
        headers = {
          "Authorization": "Bearer ".concat(bucket_config.write_key)
        };
      } // Remove id


      delete params.id;
      return requestHandler(HTTP_METHODS.PATCH, endpoint, params, headers);
    },
    getObjectMetafields: function getObjectMetafields(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id, "/metafields?read_key=").concat(bucket_config.read_key);
      return requestHandler(HTTP_METHODS.GET, endpoint);
    },
    /// DEPRECATED
    editObjectMetafields: function editObjectMetafields(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id, "/metafields");

      if (bucket_config.write_key) {
        headers = {
          "Authorization": "Bearer ".concat(bucket_config.write_key)
        };
      } // Remove id


      delete params.id;
      return requestHandler(HTTP_METHODS.PATCH, endpoint, params, headers);
    },
    editObjectMetafield: function editObjectMetafield(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id, "/metafields/").concat(params.key);

      if (bucket_config.write_key) {
        headers = {
          "Authorization": "Bearer ".concat(bucket_config.write_key)
        };
      } // Remove id


      delete params.id;
      delete params.key;
      return requestHandler(HTTP_METHODS.PATCH, endpoint, params, headers);
    },
    deleteObject: function deleteObject(params) {
      var endpoint = "".concat(URI, "/buckets/").concat(bucket_config.slug, "/objects/").concat(params.id);

      if (bucket_config.write_key) {
        headers = {
          "Authorization": "Bearer ".concat(bucket_config.write_key)
        };
      }

      return requestHandler(HTTP_METHODS.DELETE, endpoint, null, headers);
    }
  };
};

module.exports = objectMethods;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWNrZXQvb2JqZWN0LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJVUkkiLCJIVFRQX01FVEhPRFMiLCJyZXF1ZXN0SGFuZGxlciIsImhlYWRlcnMiLCJhZGRQYXJhbXNUb09iamVjdHNFbmRwb2ludCIsImVuZHBvaW50IiwicGFyYW1zIiwibGltaXQiLCJza2lwIiwic3RhdHVzIiwiYWZ0ZXIiLCJzb3J0Iiwic2hvd19tZXRhZmllbGRzIiwicHJldHR5IiwicHJvcHMiLCJxdWVyeSIsImVuY29kZVVSSSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1c2VfY2FjaGUiLCJvYmplY3RNZXRob2RzIiwiYnVja2V0X2NvbmZpZyIsImdldE9iamVjdHMiLCJzbHVnIiwicmVhZF9rZXkiLCJHRVQiLCJnZXRPYmplY3QiLCJFcnJvciIsImlkIiwiZ2V0T2JqZWN0UmV2aXNpb25zIiwiZ2V0TWVyZ2VSZXF1ZXN0T2JqZWN0cyIsImFkZE9iamVjdCIsIndyaXRlX2tleSIsIlBPU1QiLCJhZGRPYmplY3RSZXZpc2lvbiIsInR5cGUiLCJlZGl0T2JqZWN0IiwiUEFUQ0giLCJnZXRPYmplY3RNZXRhZmllbGRzIiwiZWRpdE9iamVjdE1ldGFmaWVsZHMiLCJlZGl0T2JqZWN0TWV0YWZpZWxkIiwia2V5IiwiZGVsZXRlT2JqZWN0IiwiREVMRVRFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7ZUFBZ0JBLE9BQU8sQ0FBQyxzQkFBRCxDO0lBQWZDLEcsWUFBQUEsRzs7QUFDUixJQUFNQyxZQUFZLEdBQUdGLE9BQU8sQ0FBQyx5QkFBRCxDQUE1Qjs7Z0JBQzJCQSxPQUFPLENBQUMsNEJBQUQsQztJQUExQkcsYyxhQUFBQSxjOztBQUNSLElBQUlDLE9BQUo7O0FBRUEsSUFBTUMsMEJBQTBCLEdBQUcsU0FBN0JBLDBCQUE2QixDQUFDQyxRQUFELEVBQVdDLE1BQVgsRUFBc0I7QUFDdkQsTUFBSUEsTUFBTSxJQUFJQSxNQUFNLENBQUNDLEtBQXJCLEVB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LENBQUNzQixFQUFkO0FBQ0EsYUFBT3RCLE1BQU0sQ0FBQ21DLEdBQWQ7QUFDQSxhQUFPdkMsY0FBYyxDQUFDRCxZQUFZLENBQUNvQyxLQUFkLEVBQXFCaEMsUUFBckIsRUFBK0JDLE1BQS9CLEVBQXVDSCxPQUF2QyxDQUFyQjtBQUNELEtBMUZ1QztBQTJGeEN1QyxJQUFBQSxZQUFZLEVBQUUsc0JBQUNwQyxNQUFELEVBQVk7QUFDeEIsVUFBTUQsUUFBUSxhQUFNTCxHQUFOLHNCQUFxQnFCLGFBQWEsQ0FBQ0UsSUFBbkMsc0JBQW1EakIsTUFBTSxDQUFDc0IsRUFBMUQsQ0FBZDs7QUFDQSxVQUFJUCxhQUFhLENBQUNXLFNBQWxCLEVBQTZCO0FBQzNCN0IsUUFBQUEsT0FBTyxHQUFHO0FBQ1IsNENBQTJCa0IsYUFBYSxDQUFDVyxTQUF6QztBQURRLFNBQVY7QUFHRDs7QUFDRCxhQUFPOUIsY0FBYyxDQUFDRCxZQUFZLENBQUMwQyxNQUFkLEVBQXNCdEMsUUFBdEIsRUFBZ0MsSUFBaEMsRUFBc0NGLE9BQXRDLENBQXJCO0FBQ0Q7QUFuR3VDLEdBQXBCO0FBQUEsQ0FBdEI7O0FBc0dBeUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekIsYUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IFVSSSB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb25zdGFudHMnKVxuY29uc3QgSFRUUF9NRVRIT0RTID0gcmVxdWlyZSgnLi4vaGVscGVycy9odHRwX21ldGhvZHMnKVxuY29uc3QgeyByZXF1ZXN0SGFuZGxlciB9ID0gcmVxdWlyZSgnLi4vaGVscGVycy9yZXF1ZXN0X2hhbmRsZXInKVxubGV0IGhlYWRlcnM7XG5cbmNvbnN0IGFkZFBhcmFtc1RvT2JqZWN0c0VuZHBvaW50ID0gKGVuZHBvaW50LCBwYXJhbXMpID0+IHtcbiAgaWYgKHBhcmFtcyAmJiBwYXJhbXMubGltaXQpIHtcbiAgICBlbmRwb2ludCArPSBgJmxpbWl0PSR7cGFyYW1zLmxpbWl0fWBcbiAgfVxuICBpZiAocGFyYW1zICYmIHBhcmFtcy5za2lwKSB7XG4gICAgZW5kcG9pbnQgKz0gYCZza2lwPSR7cGFyYW1zLnNraXB9YFxuICB9XG4gIGlmIChwYXJhbXMgJiYgcGFyYW1zLnN0YXR1cykge1xuICAgIGVuZHBvaW50ICs9IGAmc3RhdHVzPSR7cGFyYW1zLnN0YXR1c31gXG4gIH1cbiAgaWYgKHBhcmFtcyAmJiBwYXJhbXMuYWZ0ZXIpIHtcbiAgICBlbmRwb2ludCArPSBgJmFmdGVyPSR7cGFyYW1zLmFmdGVyfWBcbiAgfVxuICBpZiAocGFyYW1zICYmIHBhcmFtcy5zb3J0KSB7XG4gICAgZW5kcG9pbnQgKz0gYCZzb3J0PSR7cGFyYW1zLnNvcnR9YFxuICB9XG4gIGlmIChwYXJhbXMgJiYgcGFyYW1zLnNob3dfbWV0YWZpZWxkcykge1xuICAgIGVuZHBvaW50ICs9IGAmc2hvd19tZXRhZmllbGRzPSR7cGFyYW1zLnNob3dfbWV0YWZpZWxkc31gXG4gIH1cbiAgaWYgKHBhcmFtcyAmJiBwYXJhbXMucHJldHR5KSB7XG4gICAgZW5kcG9pbnQgKz0gYCZwcmV0dHk9JHtwYXJhbXMucHJldHR5fWBcbiAgfVxuICBpZiAocGFyYW1zICYmIHBhcmFtcy5wcm9wcykge1xuICAgIGVuZHBvaW50ICs9IGAmcHJvcHM9JHtwYXJhbXMucHJvcHN9YFxuICB9XG4gIGlmIChwYXJhbXMgJiYgcGFyYW1zLnF1ZXJ5KSB7XG4gICAgZW5kcG9pbnQgKz0gYCZxdWVyeT0ke2VuY29kZVVSSShKU09OLnN0cmluZ2lmeShwYXJhbXMucXVlcnkpKX1gXG4gIH1cbiAgaWYgKHBhcmFtcyAmJiB0eXBlb2YgcGFyYW1zLnVzZV9jYWNoZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmRwb2ludCArPSBgJnVzZV9jYWNoZT0ke3BhcmFtcy51c2VfY2FjaGV9YFxuICB9XG4gIHJldHVybiBlbmRwb2ludFxufVxuXG5jb25zdCBvYmplY3RNZXRob2RzID0gKGJ1Y2tldF9jb25maWcpID0+ICh7XG4gIGdldE9iamVjdHM6IChwYXJhbXMpID0+IHtcbiAgICBsZXQgZW5kcG9pbnQgPSBgJHtVUkl9L2J1Y2tldHMvJHtidWNrZXRfY29uZmlnLnNsdWd9L29iamVjdHM/cmVhZF9rZXk9JHtidWNrZXRfY29uZmlnLnJlYWRfa2V5fWBcbiAgICBlbmRwb2ludCA9IGFkZFBhcmFtc1RvT2JqZWN0c0VuZHBvaW50KGVuZHBvaW50LCBwYXJhbXMpXG4gICAgcmV0dXJuIHJlcXVlc3RIYW5kbGVyKEhUVFBfTUVUSE9EUy5HRVQsIGVuZHBvaW50KVxuICB9LFxuICBnZXRPYmplY3Q6IChwYXJhbXMpID0+IHtcbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHN1cHBseSBwYXJhbXMgb2JqZWN0IHdpdGggb2JqZWN0IGlkJylcbiAgICB9XG4gICAgbGV0IGVuZHBvaW50ID0gYCR7VVJJfS9idWNrZXRzLyR7YnVja2V0X2NvbmZpZy5zbHVnfS9vYmplY3RzLyR7cGFyYW1zLmlkfT9yZWFkX2tleT0ke2J1Y2tldF9jb25maWcucmVhZF9rZXl9YFxuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnN0YXR1cykge1xuICAgICAgZW5kcG9pbnQgKz0gYCZzdGF0dXM9JHtwYXJhbXMuc3RhdHVzfWBcbiAgICB9XG4gICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMucHJvcHMpIHtcbiAgICAgIGVuZHBvaW50ICs9IGAmcHJvcHM9JHtwYXJhbXMucHJvcHN9YFxuICAgIH1cbiAgICBpZiAocGFyYW1zICYmIHR5cGVvZiBwYXJhbXMudXNlX2NhY2hlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZW5kcG9pbnQgKz0gYCZ1c2VfY2FjaGU9JHtwYXJhbXMudXNlX2NhY2hlfWBcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3RIYW5kbGVyKEhUVFBfTUVUSE9EUy5HRVQsIGVuZHBvaW50KVxuICB9LFxuICBnZXRPYmplY3RSZXZpc2lvbnM6IChwYXJhbXMpID0+IHtcbiAgICBsZXQgZW5kcG9pbnQgPSBgJHtVUkl9L2J1Y2tldHMvJHtidWNrZXRfY29uZmlnLnNsdWd9L29iamVjdHMvJHtwYXJhbXMuaWR9L3JldmlzaW9ucz9yZWFkX2tleT0ke2J1Y2tldF9jb25maWcucmVhZF9rZXl9YFxuICAgIGVuZHBvaW50ID0gYWRkUGFyYW1zVG9PYmplY3RzRW5kcG9pbnQoZW5kcG9pbnQsIHBhcmFtcylcbiAgICByZXR1cm4gcmVxdWVzdEhhbmRsZXIoSFRUUF9NRVRIT0RTLkdFVCwgZW5kcG9pbnQpXG4gIH0sXG4gIGdldE1lcmdlUmVxdWVzdE9iamVjdHM6IChwYXJhbXMpID0+IHtcbiAgICBsZXQgZW5kcG9pbnQgPSBgJHtVUkl9L2J1Y2tldHMvJHtidWNrZXRfY29uZmlnLnNsdWd9L21lcmdlLXJlcXVlc3RzLyR7cGFyYW1zLmlkfS9vYmplY3RzP3JlYWRfa2V5PSR7YnVja2V0X2NvbmZpZy5yZWFkX2tleX1gXG4gICAgZW5kcG9pbnQgPSBhZGRQYXJhbXNUb09iamVjdHNFbmRwb2ludChlbmRwb2ludCwgcGFyYW1zKVxuICAgIHJldHVybiByZXF1ZXN0SGFuZGxlcihIVFRQX01FVEhPRFMuR0VULCBlbmRwb2ludClcbiAgfSxcbiAgYWRkT2JqZWN0OiAocGFyYW1zKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSBgJHtVUkl9L2J1Y2tldHMvJHtidWNrZXRfY29uZmlnLnNsdWd9L29iamVjdHNgXG4gICAgaWYgKGJ1Y2tldF9jb25maWcud3JpdGVfa2V5KSB7XG4gICAgICBoZWFkZXJzID0ge1xuICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke2J1Y2tldF9jb25maWcud3JpdGVfa2V5fWBcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3RIYW5kbGVyKEhUVFBfTUVUSE9EUy5QT1NULCBlbmRwb2ludCwgcGFyYW1zLCBoZWFkZXJzKVxuICB9LFxuICBhZGRPYmplY3RSZXZpc2lvbjogKHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gYCR7VVJJfS9idWNrZXRzLyR7YnVja2V0X2NvbmZpZy5zbHVnfS9vYmplY3RzLyR7cGFyYW1zLmlkfS9yZXZpc2lvbnNgXG4gICAgZGVsZXRlIHBhcmFtcy5pZFxuICAgIGRlbGV0ZSBwYXJhbXMudHlwZVxuICAgIGlmIChidWNrZXRfY29uZmlnLndyaXRlX2tleSkge1xuICAgICAgaGVhZGVycyA9IHtcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHtidWNrZXRfY29uZmlnLndyaXRlX2tleX1gXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0SGFuZGxlcihIVFRQX01FVEhPRFMuUE9TVCwgZW5kcG9pbnQsIHBhcmFtcywgaGVhZGVycylcbiAgfSxcbiAgZWRpdE9iamVjdDogKHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gYCR7VVJJfS9idWNrZXRzLyR7YnVja2V0X2NvbmZpZy5zbHVnfS9vYmplY3RzLyR7cGFyYW1zLmlkfWBcbiAgICBpZiAoYnVja2V0X2NvbmZpZy53cml0ZV9rZXkpIHtcbiAgICAgIGhlYWRlcnMgPSB7XG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7YnVja2V0X2NvbmZpZy53cml0ZV9rZXl9YFxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgaWRcbiAgICBkZWxldGUgcGFyYW1zLmlkO1xuICAgIHJldHVybiByZXF1ZXN0SGFuZGxlcihIVFRQX01FVEhPRFMuUEFUQ0gsIGVuZHBvaW50LCBwYXJhbXMsIGhlYWRlcnMpXG4gIH0sXG4gIGdldE9iamVjdE1ldGFmaWVsZHM6IChwYXJhbXMpID0+IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IGAke1VSSX0vYnVja2V0cy8ke2J1Y2tldF9jb25maWcuc2x1Z30vb2JqZWN0cy8ke3BhcmFtcy5pZH0vbWV0YWZpZWxkcz9yZWFkX2tleT0ke2J1Y2tldF9jb25maWcucmVhZF9rZXl9YFxuICAgIHJldHVybiByZXF1ZXN0SGFuZGxlcihIVFRQX01FVEhPRFMuR0VULCBlbmRwb2ludCk7XG4gIH0sXG4gIC8vLyBERVBSRUNBVEVEXG4gIGVkaXRPYmplY3RNZXRhZmllbGRzOiAocGFyYW1zKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSBgJHtVUkl9L2J1Y2tldHMvJHtidWNrZXRfY29uZmlnLnNsdWd9L29iamVjdHMvJHtwYXJhbXMuaWR9L21ldGFmaWVsZHNgXG4gICAgaWYgKGJ1Y2tldF9jb25maWcud3JpdGVfa2V5KSB7XG4gICAgICBoZWFkZXJzID0ge1xuICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke2J1Y2tldF9jb25maWcud3JpdGVfa2V5fWBcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIGlkXG4gICAgZGVsZXRlIHBhcmFtcy5pZDtcbiAgICByZXR1cm4gcmVxdWVzdEhhbmRsZXIoSFRUUF9NRVRIT0RTLlBBVENILCBlbmRwb2ludCwgcGFyYW1zLCBoZWFkZXJzKVxuICB9LFxuICBlZGl0T2JqZWN0TWV0YWZpZWxkOiAocGFyYW1zKSA9PiB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSBgJHtVUkl9L2J1Y2tldHMvJHtidWNrZXRfY29uZmlnLnNsdWd9L29iamVjdHMvJHtwYXJhbXMuaWR9L21ldGFmaWVsZHMvJHtwYXJhbXMua2V5fWBcbiAgICBpZiAoYnVja2V0X2NvbmZpZy53cml0ZV9rZXkpIHtcbiAgICAgIGhlYWRlcnMgPSB7XG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7YnVja2V0X2NvbmZpZy53cml0ZV9rZXl9YFxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgaWRcbiAgICBkZWxldGUgcGFyYW1zLmlkO1xuICAgIGRlbGV0ZSBwYXJhbXMua2V5O1xuICAgIHJldHVybiByZXF1ZXN0SGFuZGxlcihIVFRQX01FVEhPRFMuUEFUQ0gsIGVuZHBvaW50LCBwYXJhbXMsIGhlYWRlcnMpXG4gIH0sXG4gIGRlbGV0ZU9iamVjdDogKHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gYCR7VVJJfS9idWNrZXRzLyR7YnVja2V0X2NvbmZpZy5zbHVnfS9vYmplY3RzLyR7cGFyYW1zLmlkfWBcbiAgICBpZiAoYnVja2V0X2NvbmZpZy53cml0ZV9rZXkpIHtcbiAgICAgIGhlYWRlcnMgPSB7XG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7YnVja2V0X2NvbmZpZy53cml0ZV9rZXl9YFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdEhhbmRsZXIoSFRUUF9NRVRIT0RTLkRFTEVURSwgZW5kcG9pbnQsIG51bGwsIGhlYWRlcnMpXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0TWV0aG9kc1xuIl19