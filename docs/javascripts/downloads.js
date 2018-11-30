(function () {
  const downloadsTableIdentifier = document.getElementById('downloads-table-identifier');

  if (!downloadsTableIdentifier) { return; }

  const cellTitle = (version, date) => `
    <div class="title">
      <span class="title__version">
        ${version}
      </span>
      <span class="title__release-date">
        (${date})
      </span>
    </div>
  `;
  const apiLink = (name, version, prevVersion, visibility) => `
    <div class="api-link">
      <a target="_blank" href="https://api-insights.qlik.com/#/api-changes/core/${name}/${prevVersion}/${version}">
        ${name}
      </a>
    </div>
  `;
  const getCircleClass = (name) => {
    switch (name.toLowerCase()) {
      case 'added':
        return 'changes__circle--added';
      case 'updated':
        return 'changes__circle--updated';
      case 'removed':
        return 'changes__circle--removed';
      case 'deprecated':
        return 'changes__circle--deprecated';
      default:
        return '';
    }
  };
  const changesCircle = (changes, name) => {
    if (
      !changes
      || parseFloat(changes) === 0
    ) { return ''; }

    return `
      <div class="changes__circle ${getCircleClass(name)}">
        ${changes}
        <div class="tooltip">
          ${changes} API method(s) ${name.toLowerCase()}
        </div>
      </div>
    `;
  };

  const services = [
    {
      service: 'Qlik Associative Engine',
      apis: [
        'EngineAPI',
        'EngineRestAPI',
        'ScriptLanguageAPI',
      ],
    }, {
      service: 'Licenses',
      apis: [
        'LicensesAPI',
      ],
    }, {
      service: 'Mira',
      apis: [
        'MiraAPI',
      ],
    }, {
      service: 'enigma.js',
      apis: [
        'enigma.js',
      ],
    }, {
      service: 'halyard.js',
      apis: [
        'halyard.js',
      ],
    },
  ];

  const loader = document.createElement('div');
  loader.className = 'dots';
  for (let i = 0; i < 7; i++) {
    const dot = document.createElement('div');
    dot.className = 'dots__dot';
    loader.appendChild(dot);
  }

  const table = document.getElementsByTagName('table')[0];
  const lastBodyColumn = table.querySelectorAll('tr td:last-child');
  lastBodyColumn.forEach(cell => {
    cell.innerText = '';
    cell.appendChild(loader.cloneNode(true));
  });

  const schema = {
    "structs": {
      "Global": {
        "OpenDoc": {
          "In": [{ "Name": "qDocName", "DefaultValue": "" }, { "Name": "qUserName", "DefaultValue": "", "Optional": true }, { "Name": "qPassword", "DefaultValue": "", "Optional": true }, { "Name": "qSerial", "DefaultValue": "", "Optional": true }, { "Name": "qNoData", "DefaultValue": false, "Optional": true }],
          "Out": []
        }
      },
      "Doc": {
        "CreateSessionObject": {
          "In": [{ "Name": "qProp", "DefaultValue": { "qInfo": { "qId": "", "qType": "" }, "qExtendsId": "", "qMetaDef": {} } }],
          "Out": []
        },
      },
      "GenericObject": {
        "GetLayout": {
          "In": [],
          "Out": [{ "Name": "qLayout" }]
        }
      }
    },
  };
  const appId = '52e3297d-ceeb-45c9-bbe4-6069fe920760';
  const session = enigma.create({
    schema,
    url: `wss://branch-sense.qlik.com/anon/app/${appId}`,
  });

  session.open()
    .then(global => global.openDoc(appId))
    .then(doc => doc.createSessionObject({
      qInfo: { qType: 'my-obj' },
      qHyperCubeDef: {
        qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 10, qHeight: 100 }],
        qDimensions: [
          "APIName", "APIVersion", "PrevAPIVersion", "ReleaseDate",
          "Added", "Updated", "Removed", "Deprecated", "Visibility"
        ].map(field => ({ qDef: { qFieldDefs: [field] } }))
      }
    })
    .then(obj => obj.getLayout())
    .then(({ qHyperCube: { qDataPages: [{ qMatrix: rawDataApis }] }}) => {
      const apis = rawDataApis.map(([
        { qText: apiName },
        { qText: apiVersion },
        { qText: prevAPIVersion },
        { qText: releaseDate },
        { qText: added },
        { qText: updated },
        { qText: removed },
        { qText: deprecated },
        { qText: visibility },
      ]) => ({
        apiName,
        apiVersion,
        prevAPIVersion,
        releaseDate,
        added,
        updated,
        removed,
        deprecated,
        visibility,
      }));

      lastBodyColumn.forEach((cell, index) => {
        const service = services[index];
        const serviceApis = apis.filter(({ apiName }) => service.apis.indexOf(apiName) >= 0);
        const publicApis = serviceApis.filter(({ visibility }) => visibility === 'public');

        const [{
          apiVersion: componentVersion,
          releaseDate: componentDate,
        }] = serviceApis;

        cell.innerText = '';
        cell.insertAdjacentHTML('beforeend', cellTitle(componentVersion, componentDate));

        publicApis.forEach(({
          apiName,
          apiVersion,
          prevAPIVersion,
          added,
          updated,
          removed,
          deprecated,
        }) => {
          cell.insertAdjacentHTML('beforeend', apiLink(apiName, apiVersion, prevAPIVersion));
          cell.insertAdjacentHTML('beforeend', `
            <div class="changes">
              ${changesCircle(added, 'added')}
              ${changesCircle(updated, 'updated')}
              ${changesCircle(removed, 'removed')}
              ${changesCircle(deprecated, 'deprecated')}
            </div>
          `);
        });
      })
    })
  )
  .then(() => session.close())
  .catch(err => console.log);
})();
