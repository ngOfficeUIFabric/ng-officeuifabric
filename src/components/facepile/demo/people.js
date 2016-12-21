var demo;
(function (demo) {

  var activeDirectoryGroup = { name: 'Active Directory', order: 1 };
  var topResultsGroup = { name: 'Top Results', order: 0 };
  var sqlUsers = { name: 'SQL Users', order: 2 };

  demo.people = [
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Russel Miller',
      secondaryText: 'Sales',
      presence: 'available',
      group: topResultsGroup,
      color: 'magenta',
      initials: 'RM'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Douglas Fielder',
      secondaryText: 'Public Relations',
      presence: 'available',
      group: topResultsGroup,
      color: 'magenta',
      initials: 'DF',
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Russel Miller',
      secondaryText: 'Sales',
      presence: 'available',
      group: activeDirectoryGroup,
      color: 'magenta',
      initials: 'RM',
      additionalData: [
        {
          icon: 'Persona.Person2.png',
          primaryText: 'Joseph Pena',
          secondaryText: 'Contoso Inc.',
          presence: 'available',
          group: sqlUsers,
          color: 'magenta'
        }
      ]
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Douglas Fielder',
      secondaryText: 'Public Relations',
      presence: 'available',
      group: activeDirectoryGroup,
      color: 'magenta',
      initials: 'DF'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Grant Steel',
      secondaryText: 'Technical Support',
      presence: 'available',
      group: activeDirectoryGroup,
      color: 'magenta',
      initials: 'GS'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Jessica Fischer',
      secondaryText: 'Public Relations',
      presence: 'available',
      group: activeDirectoryGroup,
      color: 'magenta',
      initials: 'JF'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Michael Villa',
      secondaryText: 'Contoso Inc.',
      presence: 'available',
      group: sqlUsers,
      color: 'magenta',
      initials: 'MV'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Joseph Pena',
      secondaryText: 'Contoso Inc.',
      presence: 'available',
      group: sqlUsers,
      color: 'magenta',
      initials: 'JP'
    }
  ];

  demo.membersList = [
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Joseph Pena',
      secondaryText: 'Contoso Inc.',
      presence: 'available',
      color: 'magenta'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Grant Steel',
      secondaryText: 'Technical Support',
      presence: 'available',
      color: 'magenta'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Michael Villa',
      secondaryText: 'Contoso Inc.',
      presence: 'available',
      color: 'magenta'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Russel Miller',
      secondaryText: 'Sales',
      presence: 'available',
      color: 'magenta',
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Douglas Fielder',
      secondaryText: 'Public Relations',
      presence: 'available',
      color: 'magenta'
    },
    {
      icon: 'Persona.Person2.png',
      primaryText: 'Jessica Fischer',
      secondaryText: 'Public Relations',
      presence: 'available',
      color: 'magenta'
    }
  ];

  demo.facePile = [{
    initials: 'JP',
    primaryText: 'Joseph Pena',
    secondaryText: 'Contoso Inc.',
    presence: 'available',
    color: 'magenta'
  },
  {
    initials: 'GS',
    primaryText: 'Grant Steel',
    secondaryText: 'Technical Support',
    presence: 'available',
    color: 'darkBlue'
  },
  {
    initials: 'MV',
    primaryText: 'Michael Villa',
    secondaryText: 'Contoso Inc.',
    presence: 'available',
    color: 'lightGreen'
  },
  {
    initials: 'RM',
    primaryText: 'Russel Miller',
    secondaryText: 'Sales',
    presence: 'available',
    color: 'orange',
  },
  {
    initials: 'DF',
    primaryText: 'Douglas Fielder',
    secondaryText: 'Public Relations',
    presence: 'available',
    color: 'darkRed'
  },
  {
    initials: 'JF',
    primaryText: 'Jessica Fischer',
    secondaryText: 'Public Relations',
    presence: 'available',
    color: 'teal'
  }
  ];

})(demo || (demo = {}));
