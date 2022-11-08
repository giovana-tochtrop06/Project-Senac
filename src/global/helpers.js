/**
 * Espera o jQuery ser carregado para executar um callback
 * @param {function} callback Função a ser executada
 * @param {number} timeLimit Tempo máximo de espera em ms
 */
export function waitjQuery(callback, timeLimit = 10000) {
  const interval = setInterval(() => {
    if (Object.prototype.hasOwnProperty.call(window, 'jQuery')
      && Object.prototype.hasOwnProperty.call(window, '$')) {
      clearInterval(interval);
      // eslint-disable-next-line no-use-before-define
      clearTimeout(timeout);
      callback();
    }
  }, 50);
  const timeout = setTimeout(() => {
    clearInterval(interval);
  }, timeLimit);
}

/**
 * Espera um elemento existir para executar um callback
 * @param {string} selector Seletor CSS do elemento
 * @param {function} callback Função a ser executada
 */
export function waitEl(selector, callback) {
  const wait = setInterval(() => {
    const element = document.querySelector(selector);
    if (element !== null) {
      clearInterval(wait);
      callback(element);
    }
  }, 100);
}

/**
 * Espera um elemento existir para executar um callback
 * @param {string} selector Seletor CSS do elemento
 * @param {function} callback Função a ser executada
 */
export function waitElShadowRoot(selectorShadow, selectorPostShadow, callBack) {
  const wait = setInterval(() => {
    const elementShadow = document.querySelector(selectorShadow)?.shadowRoot;
    const selectorShadowChild = elementShadow?.querySelector(selectorPostShadow);
    if (selectorShadowChild) {
      clearInterval(wait);
      callBack(selectorShadowChild);
    }
  }, 100);
}


/**
 * Aguarda a função condition retornar true para então executar a callback.
 * @param {function} condition Função que retorna true ou false
 * @param {function} callback Função a ser executada quando condition retornar true
 */
export function waitCondition(condition, callback) {
  if (condition()) {
    callback();
  } else {
    const wait = setInterval(() => {
      if (condition()) {
        clearInterval(wait);
        callback();
      }
    }, 100);
  }
}

/**
 * Em casos no qual eventos são disparados com intervalo de tempo muito pequeno,
 * como 'scroll', é possivel usar debounce para setar um tempo de espera entre um disparo e outro.
 * Com immediate setado como true, o primeiro disparo é feito imediatamente e após
 * aguarda o tempo que foi determinado sem a ocorrência do evento para que seja disparado novamente,
 * e setado como false, executa apenas após o tempo de espera.
 * Ex: document.addEventListener('scroll', debounce(() => console.log('scrollei'), 1000, true));
 * REF: https://davidwalsh.name/javascript-debounce-function
 * @param {function} func Função a ser executada
 * @param {number} wait Tempo de espera entre execuções
 * @param {boolean} immediate Se a função deve ser executada imediatamente
 */
export function debounce(func, wait, immediate) {
  let timeout;

  return function fn(...args) {
    const later = () => {
      timeout = undefined;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * Retorna um array com valores repetidos removidos
 * @param {array} array Array com elementos repetidos
 */
export function filterUniques(array) {
  const seen = {};
  const out = [];
  const len = array.length;
  let j = 0;
  for (let i = 0; i < len; i += 1) {
    const item = array[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j] = item;
      j += 1;
    }
  }
  return out;
}

/**
 * Cria ou atualiza um cookie
 * @param {string} name Nome do cookie
 * @param {string|number} value Valor do cookie
 * @param {number} expireInDays Dias de duração do cookie. Se não informado,
 * cria como cookie de sessão
 */
export function setCookie(name, value, expireInDays = 0) {
  let expires = '';
  if (expireInDays) {
    const date = new Date();
    date.setTime(date.getTime() + expireInDays * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Retorna o valor de cookie existente
 * @param {string} name Nome do cookie
 */
export function getCookie(name) {
  const key = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(key) === 0) {
      return c.substring(key.length, c.length);
    }
  }
  return '';
}

/**
 * Deleta um cookie
 * @param {string} name Nome do cookie
 */
export function deleteCookie(name) {
  setCookie(name, '', -1);
}

/**
 * Retorna o valor de parâmetro de URL
 * @param {string} name Nome do parâmetro
 */
export function getUrlParameter(name) {
  const escapedParam = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${escapedParam}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Retorna o nome de um tracker vinculado ao GA informado. Deve-se esperar a
 * variável global ga e seu método getAll existirem antes de chamar esta função!
 * @param {string} id Id da propriedade do GA
 * @param {string} googleAnalyticsId ID da propriedade do GA
 */
export function getTrackerName(googleAnalyticsId) {
  const isGALoaded = Object.prototype.hasOwnProperty.call(window, 'ga')
    && Object.prototype.hasOwnProperty.call(window.ga, 'getAll');

  if (!isGALoaded) return undefined;

  const trackers = window.ga.getAll();
  let trackerName;
  let k = 0;

  while (!trackerName && k < trackers.length) {
    if (trackers[k].get('trackingId') === googleAnalyticsId) {
      trackerName = trackers[k].get('name');
    }
    k += 1;
  }

  return trackerName;
}

/**
 * Validação mais completa para identificar se um evento foi disparado pelo usuário
 * ou por script, para funcionar também com listeners e triggers do jQuery.
 * Caso não tenha jQuery no site, pode-se usar direto o campo `ev.isTrusted`.
 */
export function isUserEvent(ev) {
  return ev.originalEvent ? ev.originalEvent.isTrusted : !!ev.isTrusted;
}

/**
 * Adiciona um evento que só dispara o callback caso a
 * ação tenha sido feita pelo próprio usuário
 * @param {string} seletor Seletor CSS do elemento
 * @param {string} event Evento a ser esperado
 * @param {function} callback Função a ser executada
 */
export function addTrueListener(seletor, event, callback) {
  const element = document.querySelector(seletor);

  if (element !== null) {
    element.addEventListener(event, (ev) => {
      if (isUserEvent(ev)) {
        callback();
      }
    });
  }
}

/**
 * Copia a string passada como parâmetro para área de transferência
 */
export function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

/**
 * Envolve os filhos do elemento pai num novo elemento.
 * Pode-se passar um elemento ou uma string com o nome da tag.
 * Ex: wrapInner(document.body, 'div');
 * @param {element} parentElement Elemento pai
 * @param {element|string} wrapperElement Elemento para envolver o conteúdo
 */
export function wrapInner(parentElement, wrapper) {
  const wrapperElement = typeof wrapper === 'string' ? document.createElement(wrapper) : wrapper;

  parentElement.appendChild(wrapperElement);

  while (parentElement.firstChild !== wrapperElement && parentElement.firstChild !== null) {
    wrapperElement.appendChild(parentElement.firstChild);
  }
}

/**
 * Retorna se o elemento está visível na tela (fonte: jQuery)
 */
export function isElementVisible(element) {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

/**
 * Executa uma função quando o DOM estiver carregado. Caso o DOM já esteja
 * carregado a função é executada imediatamente.
 * @param {function} callback Função a ser executada quando o DOM estiver carregado
 */
export function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Converte um NodeList (resultado de um querySelectorAll, por exemplo) em Array
 * para poder utilizar os métodos de Array como forEach, map, etc que não possuem
 * suporte no Internet Explorer.
 * @param {nodeList} nodeList Lista resultado de um querySelectorAll, por exemplo
 */
export function nodeListToArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

/**
 * Converte uma string de HTML em elementos DOM. A estrutura HTML deve
 * possuir apenas uma tag como raíz da árvore.
 * @param {string} HTMLAsString String representando o HTML
 */
export function parseHTMLFromString(HTMLAsString) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = HTMLAsString;
  return wrapper.firstElementChild;
}

/**
 * Auxiliar para a função sendForm
 * @param {object} json
 */
export function jsonToQueryString(json) {
  return Object.keys(json)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
}

/**
 * Faz o envio de um formulário via ajax
 * @param {object} formDataInfos Objeto com as chaves e valores dos inputs a serem enviados
 * Ex:  const formDataInfos = {
    nome: formData.nome,
    email: formData.email,
  };
 * @param {string} endpoint String representando qual endpoint para envio
 */
export function sendForm(formDataInfos, endpoint) {
  const data = jsonToQueryString(formDataInfos);
  const xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
      // console.log(this.responseText);
    }
  });

  xhr.open('POST', endpoint);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.send(data);
}

/**
 * A função matchMedia retorna um objeto MediaQueryList com a análise da media query especificada.
 * @param {string} mediaQuery media query, desta forma (max-width: 699px)
 */
export function matchesMediaQuery(mediaQuery) {
  return window.matchMedia(mediaQuery).matches;
}

/**
 * Retorna se o dispositivo é mobile (inclui tablets)
 * Evitar utilizar para questões de layout/resolução (neste caso preferir matchesMediaQuery)
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 */
export function isMobileDevice() {
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Mobi/i.test(window.navigator.userAgent);
}

function replaceAt(str, index, replacement) {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

/**
 * Retorna se um email é válido
 */
export function isValidEmail(email) {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  );
  return regex.test(email);
}

/**
 * Retorna se um número de telefone está no padrão (00) 90000-0000
 * O dígito na posição do 9 é opcional, para validar também telefone fixos.
 */
export function isValidPhone(phone) {
  const regex = /^\([1-9]{2}\)\s\d?\d{4}-\d{4}$/;
  return regex.test(phone);
}

/**
 * Retorna se um CPF é válido de acordo com as regras do Ministério da Fazenda
 */
export function isValidCpf(value) {
  let cpf = value;
  let soma = 0;
  let resto;

  cpf = cpf.replace(/\D/g, '');
  if (cpf === '00000000000' || cpf.length > 11) return false;

  for (let i = 1; i <= 9; i += 1) soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;

  soma = 0;
  for (let i = 1; i <= 10; i += 1) soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
}

/**
 * Máscara no padrão: (00) 90000-0000
 * Utiliza a função auxiliar replaceAt
 */
export function phoneMask(val) {
  const split = val.replace(/\D/g, '').split('');
  if (split.length === 0) return '';
  const pattern = split.length > 10 ? '(dd) ddddd-dddd' : '(dd) dddd-dddd';
  const maxdigits = 11;
  let masked = pattern;
  let lastIdx = 0;
  for (let i = 0; i < Math.min(split.length, maxdigits); i += 1) {
    const nextSpot = masked.indexOf('d');
    masked = replaceAt(masked, nextSpot, split[i]);
    lastIdx = nextSpot;
  }
  return masked.substr(0, lastIdx + 1);
}

/**
 * Máscara no padrão: dd/mm/aaaa
 * Utiliza a função auxiliar replaceAt
 */
export function dateMask(val) {
  const split = val.replace(/\D/g, '').split('');
  if (split.length === 0) return '';
  const pattern = 'dd/dd/dddd';
  const maxdigits = 8;
  let masked = pattern;
  let lastIdx = 0;
  for (let i = 0; i < Math.min(split.length, maxdigits); i += 1) {
    const nextSpot = masked.indexOf('d');
    masked = replaceAt(masked, nextSpot, split[i]);
    lastIdx = nextSpot;
  }
  return masked.substr(0, lastIdx + 1);
}

/**
 * Máscara no padrão: 000.000.00-00
 */
export function cpfMask(cpf) {
  let masked = cpf.replace(/\D/g, '');
  masked = masked.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
  masked = masked.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
  masked = masked.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
  return masked;
}

/**
 * Adiciona uma função de máscara num input
 */
export function bindMask(input, maskFn) {
  input.addEventListener('input', (event) => {
    // eslint-disable-next-line prefer-destructuring
    const target = event.target;
    target.value = maskFn(target.value);
  });
}

/**
 * Funcao para evitar problemas de arredondamento de precisao de ponto flutuante em javascript,
 * recebe um número a ser arredondado e o número de casas desejado no retorno. Ex:
 * > 1.005.toFixed(2);  // "1.00"
 * > secureFloatRounding(1.005, 2); // 1.01
 */
export function secureFloatRounding(value, fractionalDigits) {
  let pair = (`${value}e`).split('e');
  const rounded = Math.round(+`${pair[0]}e${+pair[1] + fractionalDigits}`);
  pair = (`${rounded}e`).split('e');
  return +(`${pair[0]}e${+pair[1] - fractionalDigits}`);
}

/** recebe um array de pathnames e verifica se o pathname da página é
  * algum dos elementos do array
  */
export function isOnPathList(paths) {
  const { pathname } = window.location;
  return paths.some((path) => pathname.indexOf(path) !== -1);
}

/**
 * Retorna o valor de uma propriedade num objeto a partir de um caminho especificado.
 * Caso alguma propriedade intermediária não exista é retornado o valor default (ou undefined).
 * Fonte: https://gitlab.com/-/snippets/2009676
 * @param {object} object Objeto que será percorrido
 * @param {string} path Caminho da propriedade, no formato: 'foo.bar.zaz'
 * @param {any} defaultValue Valor default a ser retornado caso a propriedade não exista
 */
export function getProp(object, path, defaultValue) {
  const pathPieces = path.toString().replace(/\[(\d+)\]/g, '.$1').split('.');
  let value = JSON.parse(JSON.stringify(object));

  for (let i = 0; i < pathPieces.length; i += 1) {
    value = value[pathPieces[i]];

    if (typeof value === 'undefined') {
      return defaultValue;
    }
  }

  return value;
}

export function addEvent(obj, evt, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evt, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent(`on${evt}`, fn);
  }
}

export function mobileInactivity(callback) {
  let timeout = setTimeout(() => {
    callback();
  }, mobileTimeout * 1000);

  document.addEventListener('touchstart', () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  });

  document.addEventListener('touchend', () => {
    timeout = setTimeout(() => {
      callback();
    }, mobileTimeout * 1000);
  });
}

export function waitExitIntent(callback) {
  // é preciso uma validação para o Edge - clientX e clientY retornam valores diferentes
  if (navigator.userAgent.indexOf('Edge') > -1) {
    addEvent(document, 'mouseout', (evt) => {
      if (evt.toElement == null && evt.relatedTarget == null) {
        callback();
      }
    });
  } else {
    addEvent(document.documentElement, 'mouseleave', (evt) => {
      if (
        evt.clientX > window.innerWidth
        || evt.clientX < 0
        || evt.clientY > window.innerHeight
        || evt.clientY < 0
      ) {
        callback();
      }
    });
  }
}

export function styleShadowRoot(selector, strStyle) {
  const shadowRootEl = document.querySelector(selector)?.shadowRoot;
  if (shadowRootEl) {
    const style = document.createElement('style');
    style.classList.add('pm-swd');
    style.setAttribute('type', 'text/css');
    style.innerHTML = strStyle;
    shadowRootEl.appendChild(style);
  }
}
