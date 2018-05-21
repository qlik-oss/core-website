(function() {
  const downloadsTableIdentifier = document.getElementById('downloads-table-identifier');

  if (downloadsTableIdentifier) {
    const appId = '52e3297d-ceeb-45c9-bbe4-6069fe920760';
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
          'LicenseServiceAPI',
        ],
      }, {
        service: 'Mira',
        apis: [
          'MiraAPI',
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

    enigma.create({
      schema,
      url: `wss://branch.qlik.com/anon/app/${appId}`,
    }).open()
    .then(global => global.openDoc(appId))
    .then(doc => {
      doc.createSessionObject({
          qInfo: { qType: 'my-obj' },
          qHyperCubeDef: {
            qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 10, qHeight: 100 }],
            qDimensions: [
              { qDef: { qFieldDefs: ["APIName"], } },
              { qDef: { qFieldDefs: ["APIVersion"] } },
              { qDef: { qFieldDefs: ["PrevAPIVersion"] } },
              { qDef: { qFieldDefs: ["ReleaseDate"] } },
              { qDef: { qFieldDefs: ["Added"] } },
              { qDef: { qFieldDefs: ["Updated"] } },
              { qDef: { qFieldDefs: ["Removed"] } },
              { qDef: { qFieldDefs: ["Deprecated"] } },
              { qDef: { qFieldDefs: ["Visibility"] } },
            ],
          }
        })
        .then(obj => obj.getLayout())
        .then(layout => {
          const apis = layout.qHyperCube.qDataPages[0].qMatrix;
          const cellTitle = api => `
            <div class="title">
              <span class="title__version">
                ${api[1].qText}
              </span>
              <span class="title__release-date">
                (${api[3].qText})
              </span>
            </div>
          `;
          const apiLink = api => api[8].qText === 'public'
            ? `
              <div class="api-link">
                <a target="_blank" href="https://api-insights.qlik.com/#/api-changes/core/${api[0].qText}/${api[1].qText}/${api[2].qText}">
                  ${api[0].qText}
                </a>
              </div>
            `
            : ''
          ;
          const circleProperties = number => {
            switch(number) {
              case 4:
                return { extraClass: 'changes__circle--added', title: 'Added' } ;
              case 5:
                return { extraClass: 'changes__circle--updated', title: 'Updated' } ;
              case 6:
                return { extraClass: 'changes__circle--removed', title: 'Removed' } ;
              case 7:
                return { extraClass: 'changes__circle--deprecated', title: 'Deprecated' } ;
              default:
                return { extraClass: '', title: '' };
            }
          };
          const changesCircles = (apis, indexes = []) => {
            const publicApis = apis.filter(api => api[8].qText === 'public');
            const changes = [];

            indexes.forEach(index => {
              changes[index] = publicApis.map(api => parseInt(api[index].qText)).reduce(
                (accumulator, currentValue) => accumulator + currentValue
                , 0
              )
            });

            if (
              publicApis.length === 0 ||
              changes.every(change => change === 0)
            ) {
              return '';
            }

            return `<div class="changes">${
              (indexes.map(index => {
                return `
                  <div
                    title="${circleProperties(index).title}"
                    class="changes__circle ${circleProperties(index).extraClass}"
                  >
                    ${changes[index]}
                  </div>
                `;
              }))
              .join('')
            }</div>`;
          };

          table.querySelectorAll('tr th:last-child')[0].innerText = 'Latest Version';

          lastBodyColumn.forEach((cell, index) => {
            const service = services[index]
            const serviceApis = apis.filter(api => service.apis.indexOf(api[0].qText) >= 0);

            cell.innerText = '';
            cell.insertAdjacentHTML('beforeend', cellTitle(serviceApis[0]));
            serviceApis.forEach(api => cell.insertAdjacentHTML('beforeend', apiLink(api)));
            cell.insertAdjacentHTML('beforeend', changesCircles(serviceApis, [4, 5, 6, 7]));
          })
        })
        .then(() => doc.session.close());
      });
  }
})();
