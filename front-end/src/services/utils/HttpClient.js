import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async makeRequest(path, options) {
    await delay(2000);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([headerName, headerValue]) => {
        headers.append(headerName, headerValue);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options?.method,
      body: JSON.stringify(options?.body),
      headers,
    });

    let responseBody = null;

    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(
      response,
      responseBody,
    );
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    delay(5000);
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }
}

export default HttpClient;
