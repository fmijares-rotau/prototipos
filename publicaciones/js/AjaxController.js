// Interceptor global para XMLHttpRequest
(function() {
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        xhr.originalOpen = xhr.open;
        xhr.originalSend = xhr.send;
        xhr.openedMethod = null;
        xhr.openedUrl = null; 
        xhr.openedAsync = true;

        xhr.open = function(method, url, async, user, password) {
            xhr.openedMethod = method;
            xhr.openedUrl = url;
            xhr.openedAsync = async;

            if (isRequestActive) {
                console.log(`Petición bloqueada: ${method} ${url}. Vamos a reintentar en ${RETRY_DELAY/1000} Segundos`);
                setTimeout(function() {
                    const newXhr = new window.XMLHttpRequest();
                    newXhr.open(method, url, async, user, password);

                    // Agrega el evento 'readystatechange' para el reintento
                    newXhr.addEventListener('readystatechange', function() {
                        if (newXhr.readyState === 4) {
                            isRequestActive = false;
                            esperaRespuesta(false); // Asegurarse de desactivar el flag al finalizar el reintento
                        }
                    });

                    newXhr.send();
                }, RETRY_DELAY);
                return;
            }

            isRequestActive = true;
            esperaRespuesta(true);
            xhr.originalOpen(method, url, async, user, password);
        };

        xhr.send = function(body) {
            if (xhr.readyState !== 1) {
                return;
            }
            xhr.originalSend(body);
        };

        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === 4) {
                isRequestActive = false;
                esperaRespuesta(false);
            }
        });

        return xhr;
    };
})();

// Interceptor para peticiones fetch
(function() {
    const originalFetch = window.fetch;

    window.fetch = function(...args) {
        const [url, options] = args;
        const method = options?.method || 'GET';

        if (isRequestActive) {
            console.log(`Petición bloqueada: ${method} ${url}. Vamos a reintentar en ${RETRY_DELAY/1000} Segundos`);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    originalFetch(...args)
                        .then(response => {
                            isRequestActive = false;
                            esperaRespuesta(false); // Asegurarse de desactivar el flag al finalizar el reintento
                            resolve(response);
                        })
                        .catch(error => {
                            isRequestActive = false;
                            esperaRespuesta(false); // Asegurarse de desactivar el flag si el reintento falla
                            reject(error);
                        });
                }, RETRY_DELAY);
            });
        }

        isRequestActive = true;
        esperaRespuesta(true);

        return originalFetch(...args)
            .then(response => {
                isRequestActive = false;
                esperaRespuesta(false);
                return response;
            })
            .catch(error => {
                isRequestActive = false;
                esperaRespuesta(false);
                throw error;
            });
    };
})();

// Intercepcion de las Peticiones de OrgChartJS para transformarlas en Asyn
OrgChart._ajax = function (url, method, data, responseType, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = responseType;
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(xhr.response);
        }
    };
    xhr.onerror = function () {
        console.error("Error en la solicitud AJAX de OrgChart");
    };
    xhr.send(data);
};
