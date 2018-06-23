import english from './english'

export default {
  ...english,
  misc: {
    ...english.misc,
    nextStep: 'Nächster Schritt',
    edit: 'Bearbeiten',
    skip: 'Überspringen',
    okay: 'Okay',
    residentialAddress: 'Wohnanschrift',
    correspondenceAddress: 'Korrespondenzanschrift',
    phoneNumber: 'Telefonnummer',
    emailAddress: 'E-Mail Adresse',
    birthDate: 'Geburtsdatum',
    birthPlace: 'Geburtsort',
    citizenship: 'Nationalität',
    postalCode: 'Postleitzahl',
    city: 'Stadt',
    country: 'Land',
    streetName: 'Straße',
    buildingNumber: 'Hausnummer',
    apartmentNumber: 'Apartmentnummer',
    confirm: 'Bestätigen',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    deny: 'Ablehnen',
    allow: 'Erlauben',
    allowLocation: 'Erlaube mBank Europe auf den Standort deines Geräts zuzugreifen',
    allowCamera: 'Erlaube der mBank Europe App, Bilder und Videos aufzunehmen',
    germany: 'Deutschland'
  },
  onboarding1: {
    firstLogin: {
      0: 'Hi, willkommen!',
      1: 'Gib bitte deine Handynummer ein um zu starten',
      2: 'Ich habe bereits ein Konto'
    },
    usp: {
      0: 'Überweise weltweit kostenlos Geld',
      1: 'Transferiere mit mBank Europe gebührenfrei Geld ins Ausland - in Echtzeit. Sofortige Geldtransfers an jede Bank, jede Firma oder an Freunde.',
      2: 'Weltweit kostenfrei an Automaten Geld abheben',
      3: 'Du kannst in jedem Land bis zu 500 Euro kostenlos abheben.',
      4: 'Kontaktloses Bezahlen in verschiedenen Währungen',
      5: 'Bezahle mit deiner Kreditkarte in jedem Land mit einem Wechselkurs von 0,1%, dem niedrigsten auf dem Markt.',
      6: '…und vieles mehr!',
      7: 'Kredite, Versicherungen, Geldanlagen und mehr: Versichere deine Reisen, nutze einfache Investment Tools. Fordere deinen Kredit mit nur einem Klick an.',
      8: 'Starte jetzt!'
    },
    stepTitles: {
      0: 'Persönliche Daten',
      1: 'Video Identifikation',
      2: 'PIN & Passwort einrichten'
    },
    step1: {
      intro: {
        0: 'Eröffne dein neues mBank Konto in 3 einfachen Schritten und beginne mit…'
      },
      name: {
        0: 'Bitte erzähle uns etwas über dich',
        1: 'Vorname',
        2: 'Nachname',
        3: 'Geburtsname (optional)'
      },
      card: {
        0: 'Super, {userName}! Wähle dein Kartendesign aus'
      },
      contact: {
        0: 'Wir benötigen deine Kontaktinformationen',
        1: 'Wir verwenden diese Telefonnummer und die E-Mail Adresse für den Login'
      },
      birth: {
        0: 'Bitte gib folgende Daten ein…'
      },
      residentialAddress: {
        0: 'Bitte gib deine Adresse ein',
        1: 'Gehe sicher, dass diese Adresse deine Meldeadresse ist',
        2: 'Verwende meinen aktuellen Standort',
        3: 'Ich habe eine andere Korrespondenzanschrift'
      },
      correspondenceAddress: {
        0: 'Füge deine Korrespondenzanschrift hinzu'
      },
      taxInformation: {
        0: 'Möchtest du deine Steuerinformationen angeben?',
        1: 'Diese Angaben sind optional, aber wir müssen dich das aus rechtlichen Gründen fragen. Du kannst diese Daten auch in bis zu 90 Tagen hinterlegen.',
        2: 'In welchem Land bist du steuerpflichtig?',
        3: 'Steuer ID',
        4: '+ Weitere hinzufügen',
        5: '(optional)'
      },
      occupationalStatus: {
        0: 'Was machst du beruflich?',
        1: 'Wir müssen dir die Frage erneut aus rechtlichen Gründen stellen',
        2: 'Wähle deine Position aus',
        roles: ['Geschäftsstellenleiter', 'Creative director', 'Produktmanager']
      },
      industry: {
        0: 'In welcher Branche arbeitest du?',
        1: 'Das ist die letzte Frage!',
        2: '+ Weitere Optionen',
        industries: ['Keine Angabe', 'Finanzen', 'Fertigungsindustrie', 'Tourismus']
      },
      review: {
        0: 'Bitte überprüfe deine Daten sorgfältig. Du kannst deine Eingaben jetzt nochmal bearbeiten.'
      },
      consents: {
        0: 'Fast geschafft! Nur folgende Einwilligungen fehlen noch',
        1: 'Alle bestätigen',
        2: 'Electronic communication',
        3: 'Terms of Service of mBank and IDNow',
        4: 'Advertisement of mBank partners',
        5: 'Data processing and usage',
        6: 'General Data Protection Regulation'
      },
      finish: {
        0: 'Geschafft! Lass und jetzt dein mBank Konto eröffnen!',
        1: 'Unten findest du den Link zum Kontokorrentvertrag.',
        2: 'Du musst ihn jetzt nicht herunterladen, wir haben ihn dir bereits per E-Mail geschickt.',
        3: 'Lade den kompletten mBank Account Contract herunter (PDF)',
        4: 'Ich möchte ein mBank Konto eröffnen und bestätige, dass ich <em>für mich selbst handle</em>'
      }
    },
    step2: {
      intro: {
        0: 'Prima{userName}! Fahre mit der Video Identifikation fort und verifiziere dein Konto'
      },
      prepareToVideo: {
        title: 'Video Identifikation',
        0: 'Lege dein Ausweisdokument bereit',
        1: 'Suche dir einen ruhigen Platz',
        2: 'Stelle eine gute Internetverbindung sicher'
      },
      connecting: {
        0: 'Bitte warte einen Moment',
        1: 'Wir stellen die Verbindung mit einem unserer Berater her'
      },
      waiting: {
        0: 'Bitte warte einen Moment'
      },
      accountReady: {
        0: 'Dein neues mBank Konto ist angelegt!',
        1: 'Hier sind deine Kontodaten',
        2: 'IBAN',
        3: 'DE12 1234 5678 9876 54',
        4: 'BIC',
        5: 'ABCDE123XXX'
      }
    },
    step3: {
      intro: {
        0: 'Toll {userName}! Fahre mit der Video Identifikation fort und verifiziere dein Konto'
      },
      pinSetup: {
        title: 'Lege deine PIN fest',
        0: 'Du benötigst diese PIN für alle Autorisierungen innerhalb der App auf diesem Gerät. Wir verwenden keine andere Autorisierungs-Methode.',
        1: 'Wähle 5 - 8'
      },
      pinConfirm: {
        title: 'Bestätige deine PIN',
        0: 'Gib dieselben Ziffern erneut ein'
      },
      passwordSetup: {
        title: 'Passwort Einstellungen',
        0: 'Wir benötigen deine Kontaktinformationen',
        1: 'Du benötigst dieses Passwort um dich in deinen Account einzuloggen. Für eine gute Passwortstärke verwendest du am besten mindestens 6 Buchstaben, einer davon sollte groß sein, Zeichen und Zahlen.'
      },
      emailConfirm: {
        title: 'E-Mail Bestätigung',
        0: 'Bitte öffne die Bestätigungs-E-Mail',
        1: '…und setze den Prozess mit einem Klick auf den Link in der E-Mail fort'
      }
    }
  }
}
