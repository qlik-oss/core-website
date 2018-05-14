(function() {
  const downloadsTableWrapper = document.getElementById('downloads-table-wrapper');
  if (downloadsTableWrapper) {
    const appId = '52e3297d-ceeb-45c9-bbe4-6069fe920760';
    const services = [
      {
        service: '<a href="../services/qix-engine/introduction/">Qlik Associative Engine</a>',
        feature: 'The powerful associative indexing engine from Qlik and the foundation of Qlik Core.',
        link: '<a href="https://hub.docker.com/r/qlikcore/engine">qlikcore/engine</a>',
        apis: [
          'EngineAPI',
          'EngineRestAPI',
          'ScriptLanguageAPI',
        ],
      }, {
        service: '<a href="../services/licenses/">Licenses</a>',
        feature: 'Service required to run Qlik Associative Engine with a paid license',
        link: '<a href="https://hub.docker.com/r/qlikcore/licenses">qlikcore/licenses</a>',
        apis: [
          'LicenseServiceAPI',
        ],
      }, {
        service: '<a href="../services/mira/">Mira</a>',
        feature: 'Qlik Associative Engine discovery service.',
        link: '<a href="https://hub.docker.com/r/qlikcore/mira">qlikcore/mira</a><br>(source code: <a href="https://github.com/qlik-oss/mira">qlik-oss/mira</a>)',
        apis: [
          'MiraAPI',
        ],
      },
    ];

    fetch('https://unpkg.com/enigma.js/schemas/12.34.11.json')
    .then(response => response.json())
    .then(schema => enigma.create({
      schema,
      url: `wss://branch.qlik.com/anon/app/${appId}`,
    }))
    .then(session => session.open())
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

          const scrollWrap = document.createElement('div');
          scrollWrap.className = 'md-typeset__scrollwrap';
          downloadsTableWrapper.appendChild(scrollWrap);

          const tableContainer = document.createElement('div');
          tableContainer.className = 'md-typeset__table';
          scrollWrap.appendChild(tableContainer);

          const table = document.createElement('table');
          tableContainer.appendChild(table);

          const tableHeader = document.createElement('thead');
          table.appendChild(tableHeader);

          const tableHeaderRow = document.createElement('tr');
          tableHeader.appendChild(tableHeaderRow);
          ['Service', 'Feature', 'Links', 'Latest Version'].forEach(title => {
            const cell = document.createElement('th');
            cell.appendChild(document.createTextNode(title));
            tableHeaderRow.appendChild(cell);
          });

          const tableBody = document.createElement('tbody');
          table.appendChild(tableBody);

          services.forEach(service => {
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
              : api[0].qText
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

            const tableBodyRow = document.createElement('tr');
            tableBody.appendChild(tableBodyRow);
            ['service', 'feature', 'link'].forEach(column => {
              const cell = document.createElement('td');
              cell.insertAdjacentHTML('beforeend', service[column]);
              tableBodyRow.appendChild(cell);
            });

            const cell = document.createElement('td');
            tableBodyRow.appendChild(cell);

            const serviceApis = apis.filter(api => service.apis.indexOf(api[0].qText) >= 0);
            cell.insertAdjacentHTML('beforeend', cellTitle(serviceApis[0]));
            serviceApis.forEach(api => cell.insertAdjacentHTML('beforeend', apiLink(api)));
            cell.insertAdjacentHTML('beforeend', changesCircles(serviceApis, [4, 5, 6, 7]));
          })
        })
        .then(() => doc.session.close());
    });
  }
})();
