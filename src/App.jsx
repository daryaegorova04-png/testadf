import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Headphones, PenTool, Mic, Sparkles, Target, Brain, Trophy, Check, X, ArrowRight, ArrowLeft, RotateCcw, Eye, EyeOff, Zap, Volume2, ChevronRight, Award, Clock, Lightbulb, Star, Flame } from 'lucide-react';

// ======================================================
// DATA: Ekaterina's personal vocabulary (extracted & organized)
// ======================================================
const VOCAB = [
  // Most useful core verbs (high-frequency in TestDaF)
  { de: 'feststellen', en: 'to determine, to establish', ex: 'Forscher haben festgestellt, dass...', topic: 'Akademisch', difficulty: 1 },
  { de: 'sich auswirken auf', en: 'to affect, to impact', ex: 'Das wirkt sich positiv auf die Gesundheit aus.', topic: 'Akademisch', difficulty: 2 },
  { de: 'die Auswirkung', en: 'impact, consequence', ex: 'Die Auswirkungen sind enorm.', topic: 'Akademisch', difficulty: 1 },
  { de: 'erforschen', en: 'to research, to explore', ex: 'Wissenschaftler erforschen das Phänomen.', topic: 'Akademisch', difficulty: 1 },
  { de: 'berichten', en: 'to report', ex: 'Die Studie berichtet von neuen Ergebnissen.', topic: 'Akademisch', difficulty: 1 },
  { de: 'erläutern', en: 'to explain, to elaborate', ex: 'Erläutern Sie den Aufbau der Präsentation.', topic: 'Akademisch', difficulty: 2 },
  { de: 'darstellen', en: 'to present, to depict', ex: 'Die Grafik stellt die Entwicklung dar.', topic: 'Akademisch', difficulty: 1 },
  { de: 'einschätzen', en: 'to assess, to evaluate', ex: 'Wie schätzen Sie die Lage ein?', topic: 'Akademisch', difficulty: 2 },
  { de: 'bewerten', en: 'to evaluate, to assess', ex: 'Bewerten Sie die Situation kritisch.', topic: 'Akademisch', difficulty: 1 },
  { de: 'verfügen über', en: 'to have at one\'s disposal', ex: 'Sie verfügt über viel Erfahrung.', topic: 'Akademisch', difficulty: 3 },
  { de: 'der Beitrag', en: 'contribution', ex: 'Schreiben Sie einen kurzen Beitrag.', topic: 'Schreiben', difficulty: 1 },
  { de: 'beitragen zu', en: 'to contribute to', ex: 'Das trägt zur Lösung bei.', topic: 'Schreiben', difficulty: 2 },
  { de: 'die Folge', en: 'consequence, result', ex: 'Die Folgen sind bekannt.', topic: 'Schreiben', difficulty: 1 },
  { de: 'die Ursache', en: 'cause, reason', ex: 'Was ist die Ursache des Problems?', topic: 'Schreiben', difficulty: 1 },
  { de: 'verursachen', en: 'to cause', ex: 'Stress verursacht Krankheiten.', topic: 'Schreiben', difficulty: 2 },
  { de: 'fördern', en: 'to promote, to support financially', ex: 'Die Regierung fördert junge Familien.', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'fordern', en: 'to demand', ex: 'Die Studierenden fordern mehr Plätze.', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'verlangen', en: 'to demand, to request', ex: 'Das Gesetz verlangt es.', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'die Maßnahme', en: 'measure, action', ex: 'Welche Maßnahmen sind nötig?', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'die Herausforderung', en: 'challenge', ex: 'Eine große Herausforderung für alle.', topic: 'Gesellschaft', difficulty: 2 },
  
  // From Hausaufgaben 30.12 - Sprachstörungen (key reading text)
  { de: 'die Fertigkeit', en: 'skill, ability', ex: 'Die Sprachbeherrschung ist eine komplexe Fertigkeit.', topic: 'Sprache', difficulty: 2 },
  { de: 'das Gehirn', en: 'brain', ex: 'Das Gehirn analysiert die Grammatik.', topic: 'Sprache', difficulty: 1 },
  { de: 'rasend', en: 'extremely fast, furious', ex: 'rasend schnell', topic: 'Sprache', difficulty: 3 },
  { de: 'die Absicht', en: 'intention', ex: 'Was ist Ihre Absicht?', topic: 'Sprache', difficulty: 1 },
  { de: 'fassen', en: 'to put together, to grasp', ex: 'Worte in Sätze fassen', topic: 'Sprache', difficulty: 2 },
  { de: 'die Anweisung', en: 'instruction', ex: 'Folgen Sie den Anweisungen.', topic: 'Sprache', difficulty: 1 },
  { de: 'anfällig für', en: 'prone to, susceptible to', ex: 'Sie ist anfällig für Erkältungen.', topic: 'Gesundheit', difficulty: 3 },
  { de: 'ins Stocken geraten', en: 'to stall, to falter', ex: 'Mitten im Satz ins Stocken geraten', topic: 'Sprache', difficulty: 4 },
  { de: 'sich versprechen', en: 'to slip (verbal slip)', ex: 'Ich habe mich versprochen.', topic: 'Sprache', difficulty: 3 },
  { de: 'die Qual', en: 'torment, agony', ex: 'Die Qual der Wahl', topic: 'Sprache', difficulty: 3 },
  { de: 'die Vereinsamung', en: 'isolation, loneliness', ex: 'Vereinsamung als Folge', topic: 'Gesellschaft', difficulty: 3 },
  { de: 'die Störung', en: 'disorder, disturbance', ex: 'eine Sprachstörung', topic: 'Gesundheit', difficulty: 2 },
  
  // Hausaufgaben 02.03
  { de: 'die Lücke', en: 'gap', ex: 'Füllen Sie die Lücke.', topic: 'Allgemein', difficulty: 1 },
  { de: 'die Menge', en: 'quantity, amount', ex: 'Eine große Menge an Daten', topic: 'Allgemein', difficulty: 1 },
  { de: 'schätzen', en: 'to estimate, to value', ex: 'Schätzen Sie die Zahl.', topic: 'Allgemein', difficulty: 1 },
  { de: 'verdienen', en: 'to earn, to deserve', ex: 'Geld verdienen', topic: 'Beruf', difficulty: 1 },
  { de: 'einsam', en: 'lonely', ex: 'Er fühlt sich einsam.', topic: 'Gefühle', difficulty: 1 },
  { de: 'erledigen', en: 'to complete, to deal with', ex: 'Aufgaben erledigen', topic: 'Beruf', difficulty: 2 },
  { de: 'übernehmen', en: 'to take on, to take over', ex: 'Verantwortung übernehmen', topic: 'Beruf', difficulty: 2 },
  { de: 'die Ernährung', en: 'nutrition, diet', ex: 'gesunde Ernährung', topic: 'Gesundheit', difficulty: 1 },
  { de: 'verzichten auf', en: 'to give up on, to do without', ex: 'auf Zucker verzichten', topic: 'Gesundheit', difficulty: 2 },
  { de: 'der Ersatz', en: 'replacement, substitute', ex: 'als Ersatz dienen', topic: 'Allgemein', difficulty: 2 },
  { de: 'die Umstellung', en: 'change, conversion', ex: 'eine schwierige Umstellung', topic: 'Allgemein', difficulty: 2 },
  
  // Hausaufgaben 01.03
  { de: 'herrschen', en: 'to prevail, to rule', ex: 'Es herrscht Stille.', topic: 'Allgemein', difficulty: 2 },
  { de: 'der Verdacht', en: 'suspicion', ex: 'Ein Verdacht keimt auf.', topic: 'Allgemein', difficulty: 2 },
  { de: 'der Schaden', en: 'damage, harm', ex: 'großer Schaden entstand', topic: 'Allgemein', difficulty: 1 },
  { de: 'die Baustelle', en: 'construction site', ex: 'Lärm von der Baustelle', topic: 'Stadt', difficulty: 1 },
  { de: 'die Umgebung', en: 'environment, surroundings', ex: 'die nähere Umgebung', topic: 'Stadt', difficulty: 1 },
  { de: 'atmen', en: 'to breathe', ex: 'tief atmen', topic: 'Gesundheit', difficulty: 1 },
  { de: 'abwechslungsreich', en: 'varied, diverse', ex: 'eine abwechslungsreiche Arbeit', topic: 'Allgemein', difficulty: 2 },
  { de: 'zahlreich', en: 'numerous', ex: 'zahlreiche Beispiele', topic: 'Allgemein', difficulty: 1 },
  { de: 'ausreichend', en: 'sufficient, enough', ex: 'ausreichend Schlaf', topic: 'Allgemein', difficulty: 1 },
  
  // Bewerbung & Karriere
  { de: 'sich bewerben', en: 'to apply', ex: 'Ich bewerbe mich um die Stelle.', topic: 'Beruf', difficulty: 2 },
  { de: 'die Zusage', en: 'confirmation, acceptance letter', ex: 'eine Zusage erhalten', topic: 'Beruf', difficulty: 2 },
  { de: 'die Absage', en: 'rejection', ex: 'eine Absage bekommen', topic: 'Beruf', difficulty: 2 },
  { de: 'das Vorstellungsgespräch', en: 'job interview', ex: 'beim Vorstellungsgespräch', topic: 'Beruf', difficulty: 1 },
  { de: 'der Lebenslauf', en: 'CV, résumé', ex: 'einen Lebenslauf schreiben', topic: 'Beruf', difficulty: 1 },
  { de: 'die Erfahrung', en: 'experience', ex: 'Berufserfahrung sammeln', topic: 'Beruf', difficulty: 1 },
  { de: 'sich einarbeiten', en: 'to settle in, to get used to', ex: 'sich in eine neue Stelle einarbeiten', topic: 'Beruf', difficulty: 2 },
  { de: 'die Mitarbeitenden', en: 'employees', ex: 'neue Mitarbeitende einstellen', topic: 'Beruf', difficulty: 1 },
  { de: 'engagiert', en: 'committed, engaged', ex: 'eine engagierte Mitarbeiterin', topic: 'Beruf', difficulty: 2 },
  { de: 'motiviert', en: 'motivated', ex: 'hoch motiviert sein', topic: 'Beruf', difficulty: 1 },
  { de: 'die Karriere', en: 'career', ex: 'Karriere machen', topic: 'Beruf', difficulty: 1 },
  { de: 'der Aufwand', en: 'effort, expense', ex: 'großer Aufwand', topic: 'Beruf', difficulty: 2 },
  { de: 'durchschnittlich', en: 'average', ex: 'durchschnittlich 8 Stunden', topic: 'Allgemein', difficulty: 2 },
  { de: 'kurzfristig', en: 'short-term', ex: 'eine kurzfristige Lösung', topic: 'Allgemein', difficulty: 2 },
  { de: 'langfristig', en: 'long-term', ex: 'langfristige Ziele', topic: 'Allgemein', difficulty: 2 },
  { de: 'zunehmen', en: 'to increase', ex: 'Die Zahl nimmt zu.', topic: 'Statistik', difficulty: 1 },
  { de: 'abnehmen', en: 'to decrease', ex: 'Die Werte nehmen ab.', topic: 'Statistik', difficulty: 1 },
  { de: 'wachsen', en: 'to grow', ex: 'die Wirtschaft wächst', topic: 'Statistik', difficulty: 1 },
  { de: 'sinken', en: 'to sink, to fall', ex: 'Die Preise sinken.', topic: 'Statistik', difficulty: 1 },
  { de: 'steigen', en: 'to rise', ex: 'Die Kosten steigen.', topic: 'Statistik', difficulty: 1 },
  { de: 'erheblich', en: 'substantial, significant', ex: 'ein erheblicher Unterschied', topic: 'Statistik', difficulty: 2 },
  { de: 'jeweils', en: 'respectively, in each case', ex: 'jeweils 50 Prozent', topic: 'Statistik', difficulty: 2 },
  { de: 'berechnen', en: 'to calculate', ex: 'die Kosten berechnen', topic: 'Statistik', difficulty: 1 },
  
  // Studieren
  { de: 'das Tutorium', en: 'tutorial', ex: 'im Tutorium', topic: 'Studium', difficulty: 1 },
  { de: 'das Seminar', en: 'seminar', ex: 'ein interessantes Seminar', topic: 'Studium', difficulty: 1 },
  { de: 'die Vorlesung', en: 'lecture', ex: 'eine Vorlesung halten', topic: 'Studium', difficulty: 1 },
  { de: 'der Vortrag', en: 'lecture, presentation', ex: 'einen Vortrag halten', topic: 'Studium', difficulty: 1 },
  { de: 'die Präsentation', en: 'presentation', ex: 'eine Präsentation vorbereiten', topic: 'Studium', difficulty: 1 },
  { de: 'der Kommilitone', en: 'fellow student (m)', ex: 'mein Kommilitone studiert Jura', topic: 'Studium', difficulty: 2 },
  { de: 'die Kommilitonin', en: 'fellow student (f)', ex: 'eine nette Kommilitonin', topic: 'Studium', difficulty: 2 },
  { de: 'die Dozentin', en: 'lecturer (f)', ex: 'unsere Dozentin', topic: 'Studium', difficulty: 1 },
  { de: 'der Tutor', en: 'tutor', ex: 'unser Tutor erklärt es', topic: 'Studium', difficulty: 1 },
  { de: 'die Hochschule', en: 'university', ex: 'an einer Hochschule studieren', topic: 'Studium', difficulty: 1 },
  { de: 'die Bibliothek', en: 'library', ex: 'in die Bibliothek gehen', topic: 'Studium', difficulty: 1 },
  
  // Argumentation
  { de: 'die Forderung', en: 'demand, requirement', ex: 'eine Forderung stellen', topic: 'Argument', difficulty: 2 },
  { de: 'das Argument', en: 'argument', ex: 'ein überzeugendes Argument', topic: 'Argument', difficulty: 1 },
  { de: 'Stellung nehmen zu', en: 'to take a position on', ex: 'Stellung nehmen zu einem Thema', topic: 'Argument', difficulty: 3 },
  { de: 'der Standpunkt', en: 'point of view, position', ex: 'meinen Standpunkt erläutern', topic: 'Argument', difficulty: 2 },
  { de: 'begründen', en: 'to justify, to give reasons', ex: 'die Meinung begründen', topic: 'Argument', difficulty: 2 },
  { de: 'der Vorteil', en: 'advantage', ex: 'die Vorteile überwiegen', topic: 'Argument', difficulty: 1 },
  { de: 'der Nachteil', en: 'disadvantage', ex: 'der größte Nachteil', topic: 'Argument', difficulty: 1 },
  { de: 'einerseits ... andererseits', en: 'on one hand ... on the other', ex: 'einerseits gut, andererseits teuer', topic: 'Argument', difficulty: 2 },
  { de: 'allerdings', en: 'however, though', ex: 'Es ist gut, allerdings teuer.', topic: 'Argument', difficulty: 2 },
  { de: 'dennoch', en: 'nevertheless, still', ex: 'Es regnet, dennoch gehen wir.', topic: 'Argument', difficulty: 2 },
  { de: 'trotzdem', en: 'nevertheless, anyway', ex: 'Trotzdem habe ich es geschafft.', topic: 'Argument', difficulty: 1 },
  { de: 'außerdem', en: 'in addition, besides', ex: 'außerdem ist es günstig', topic: 'Argument', difficulty: 1 },
  { de: 'zudem', en: 'in addition, moreover', ex: 'zudem spricht er Deutsch', topic: 'Argument', difficulty: 2 },
  { de: 'vermutlich', en: 'presumably', ex: 'Er kommt vermutlich später.', topic: 'Argument', difficulty: 2 },
  { de: 'wahrscheinlich', en: 'probably', ex: 'wahrscheinlich gut', topic: 'Argument', difficulty: 1 },
  
  // Adjectives high-frequency
  { de: 'erfolgreich', en: 'successful', ex: 'eine erfolgreiche Behandlung', topic: 'Adjektiv', difficulty: 1 },
  { de: 'gefährlich', en: 'dangerous', ex: 'eine gefährliche Reise', topic: 'Adjektiv', difficulty: 1 },
  { de: 'ähnlich', en: 'similar', ex: 'ähnlich wie früher', topic: 'Adjektiv', difficulty: 1 },
  { de: 'unterschiedlich', en: 'different, varying', ex: 'unterschiedliche Meinungen', topic: 'Adjektiv', difficulty: 1 },
  { de: 'erstaunlich', en: 'astonishing, surprising', ex: 'ein erstaunliches Ergebnis', topic: 'Adjektiv', difficulty: 2 },
  { de: 'beeindruckend', en: 'impressive', ex: 'eine beeindruckende Leistung', topic: 'Adjektiv', difficulty: 2 },
  { de: 'atemberaubend', en: 'breathtaking', ex: 'eine atemberaubende Aussicht', topic: 'Adjektiv', difficulty: 3 },
  { de: 'überwältigend', en: 'overwhelming', ex: 'ein überwältigender Eindruck', topic: 'Adjektiv', difficulty: 3 },
  { de: 'ausgefeilt', en: 'sophisticated, refined', ex: 'ein ausgefeiltes System', topic: 'Adjektiv', difficulty: 4 },
  { de: 'anspruchsvoll', en: 'demanding, sophisticated', ex: 'eine anspruchsvolle Aufgabe', topic: 'Adjektiv', difficulty: 3 },
  { de: 'aufgeschlossen', en: 'open-minded', ex: 'aufgeschlossen für Neues', topic: 'Charakter', difficulty: 2 },
  { de: 'verschlossen', en: 'reserved, closed-off', ex: 'ein verschlossener Mensch', topic: 'Charakter', difficulty: 2 },
  { de: 'oberflächlich', en: 'superficial', ex: 'eine oberflächliche Beziehung', topic: 'Charakter', difficulty: 2 },
  { de: 'bescheiden', en: 'humble, modest', ex: 'er bleibt bescheiden', topic: 'Charakter', difficulty: 2 },
  { de: 'verantwortungsvoll', en: 'responsible', ex: 'eine verantwortungsvolle Aufgabe', topic: 'Charakter', difficulty: 2 },
  { de: 'achtsam', en: 'mindful, attentive', ex: 'achtsam mit der Umwelt', topic: 'Charakter', difficulty: 2 },
  { de: 'rücksichtslos', en: 'inconsiderate, ruthless', ex: 'rücksichtslos fahren', topic: 'Charakter', difficulty: 3 },
  { de: 'großartig', en: 'great, brilliant', ex: 'eine großartige Idee', topic: 'Adjektiv', difficulty: 1 },
  { de: 'gewaltig', en: 'tremendous, mighty', ex: 'gewaltige Kräfte', topic: 'Adjektiv', difficulty: 2 },
  { de: 'lediglich', en: 'merely, only', ex: 'lediglich ein Versuch', topic: 'Adjektiv', difficulty: 3 },
  { de: 'nachhaltig', en: 'sustainable', ex: 'nachhaltig leben', topic: 'Umwelt', difficulty: 2 },
  
  // Topic-relevant
  { de: 'die Umwelt', en: 'environment', ex: 'die Umwelt schützen', topic: 'Umwelt', difficulty: 1 },
  { de: 'der Klimawandel', en: 'climate change', ex: 'der Klimawandel ist real', topic: 'Umwelt', difficulty: 1 },
  { de: 'der Konsum', en: 'consumption', ex: 'der hohe Konsum', topic: 'Umwelt', difficulty: 1 },
  { de: 'verbrauchen', en: 'to consume (energy etc.)', ex: 'Strom verbrauchen', topic: 'Umwelt', difficulty: 1 },
  { de: 'verschwenden', en: 'to waste', ex: 'Wasser verschwenden', topic: 'Umwelt', difficulty: 2 },
  { de: 'die Lebensmittel', en: 'food, groceries', ex: 'Lebensmittel einkaufen', topic: 'Alltag', difficulty: 1 },
  { de: 'die Gesellschaft', en: 'society', ex: 'in unserer Gesellschaft', topic: 'Gesellschaft', difficulty: 1 },
  { de: 'die Bevölkerung', en: 'population', ex: 'die alternde Bevölkerung', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'die Mehrheit', en: 'majority', ex: 'die Mehrheit der Befragten', topic: 'Gesellschaft', difficulty: 1 },
  { de: 'die Minderheit', en: 'minority', ex: 'eine kleine Minderheit', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'das Verhalten', en: 'behavior', ex: 'menschliches Verhalten', topic: 'Gesellschaft', difficulty: 1 },
  { de: 'sich verhalten', en: 'to behave', ex: 'sich richtig verhalten', topic: 'Gesellschaft', difficulty: 2 },
  { de: 'das Benehmen', en: 'manners, conduct', ex: 'gutes Benehmen', topic: 'Gesellschaft', difficulty: 2 },
  
  // Sprachhandlungen (key for Lesen Aufgabe 4!)
  { de: 'bedauern', en: 'to regret, to be sorry', ex: 'Ich bedaure die Entscheidung.', topic: 'Sprachhandlung', difficulty: 2 },
  { de: 'begrüßen', en: 'to welcome, to greet', ex: 'Wir begrüßen die Maßnahme.', topic: 'Sprachhandlung', difficulty: 1 },
  { de: 'empfehlen', en: 'to recommend', ex: 'Ich empfehle dieses Buch.', topic: 'Sprachhandlung', difficulty: 1 },
  { de: 'kritisieren', en: 'to criticize', ex: 'die Politik kritisieren', topic: 'Sprachhandlung', difficulty: 1 },
  { de: 'prognostizieren', en: 'to predict', ex: 'Experten prognostizieren Wachstum.', topic: 'Sprachhandlung', difficulty: 3 },
  { de: 'vermuten', en: 'to suppose, to suspect', ex: 'Ich vermute, er kommt nicht.', topic: 'Sprachhandlung', difficulty: 2 },
  { de: 'warnen vor', en: 'to warn against', ex: 'vor Gefahren warnen', topic: 'Sprachhandlung', difficulty: 2 },
  { de: 'zweifeln an', en: 'to doubt', ex: 'an der Aussage zweifeln', topic: 'Sprachhandlung', difficulty: 2 },
  { de: 'behaupten', en: 'to claim, to assert', ex: 'Er behauptet das Gegenteil.', topic: 'Sprachhandlung', difficulty: 2 },
  { de: 'fordern', en: 'to demand', ex: 'mehr Geld fordern', topic: 'Sprachhandlung', difficulty: 2 },
  
  // Useful expressions
  { de: 'es geht um', en: 'it\'s about', ex: 'Es geht um die Zukunft.', topic: 'Phrase', difficulty: 1 },
  { de: 'in Anspruch nehmen', en: 'to take advantage of', ex: 'Hilfe in Anspruch nehmen', topic: 'Phrase', difficulty: 3 },
  { de: 'zur Verfügung stellen', en: 'to make available', ex: 'Räume zur Verfügung stellen', topic: 'Phrase', difficulty: 3 },
  { de: 'eine Rolle spielen', en: 'to play a role', ex: 'Geld spielt eine große Rolle.', topic: 'Phrase', difficulty: 2 },
  { de: 'im Vergleich zu', en: 'in comparison to', ex: 'im Vergleich zu früher', topic: 'Phrase', difficulty: 2 },
  { de: 'aufgrund', en: 'due to, because of', ex: 'aufgrund des Wetters', topic: 'Phrase', difficulty: 2 },
  { de: 'infolge', en: 'as a result of', ex: 'infolge der Krise', topic: 'Phrase', difficulty: 3 },
  { de: 'sich beschäftigen mit', en: 'to deal with, to study', ex: 'sich mit dem Problem beschäftigen', topic: 'Phrase', difficulty: 2 },
  { de: 'sich befassen mit', en: 'to deal with', ex: 'sich mit der Frage befassen', topic: 'Phrase', difficulty: 3 },
];

// ======================================================
// LESEN Aufgabentyp 1 — Lückentext (Cloze)
// ======================================================
const CLOZE_TEXT = {
  title: 'Keine Angst vor Spinnen und Schaben',
  intro: 'Wer Angst vor Spinnen hat, fürchtet sich oft auch vor anderen Tieren wie Ratten, Schlangen oder Schaben. Forscherinnen und Forscher haben nun ',
  parts: [
    { gap: 1, options: ['analysiert','durchgesetzt','festgelegt','festgestellt'], correct: 3, text: ', dass sich der Erfolg einer Behandlung gegen Spinnenangst auch auf andere zuvor ', explain: '"feststellen" = to establish/determine, used for discovering scientific results. "analysieren" needs an object; "durchsetzen" = to enforce; "festlegen" = to set a rule.' },
    { gap: 2, options: ['besorgniserregende','furchteinflößende','gemeingefährliche','grauenhafte'], correct: 1, text: ' Tiere auswirkt: Personen, die ihre Angst vor Spinnen durch ein Konfrontationstraining reduziert hatten, fürchteten auch Schaben deutlich weniger. Die Forscher ', explain: '"furchteinflößend" = fear-inducing — animals that cause fear. "besorgniserregend" = worrying (broader); "gemeingefährlich" = dangerous to public; "grauenhaft" = horrifying (subjective).' },
    { gap: 3, options: ['führten','passten','setzten','wandten'], correct: 3, text: ' bei Personen, die Spinnen und Schaben gleichermaßen fürchteten, die erfolgreichste Behandlungsmethode gegen Angsterkrankungen an, die Konfrontationstherapie – allerdings nur mit Spinnen. Der zentrale Wirkmechanismus dabei ist das Umlernen der Angst: Personen mit einer Spinnenangst erkennen durch die Interaktion mit der Spinne, dass Spinnen nicht gefährlich und keine katastrophalen ', explain: '"anwenden" = to apply (a method) — "Methode anwenden". The verb is split: "wandten ... an". "führen" = to lead; "passen" = to fit; "setzen" = to set.' },
    { gap: 4, options: ['Auswirkungen','Situationen','Verhältnisse','Zustände'], correct: 0, text: ' zu befürchten sind. Im Anschluss an die Behandlung hatten die Versuchspersonen weniger Angst und Ekel vor Spinnen. Erstaunlich war zudem, dass diese Gruppe auch von weniger Angst vor Schaben berichtete. Dieser Effekt trat ein, obwohl Schaben während der Konfrontation nie ', explain: '"katastrophale Auswirkungen" = catastrophic consequences — collocation. "Situationen" = situations; "Verhältnisse" = circumstances; "Zustände" = states.' },
    { gap: 5, options: ['angeboten','präpariert','präsentiert','verteilt'], correct: 2, text: ' wurden.', explain: '"präsentieren" = to show/display — they were never SHOWN cockroaches. "anbieten" = to offer; "präparieren" = to prepare (e.g. specimens); "verteilen" = to distribute.' },
  ]
};

// ======================================================
// LESEN Aufgabentyp 2 — Textabschnitte ordnen
// ======================================================
const ORDER_TASK = {
  title: 'Sprach- und Sprechstörungen',
  correctOrder: [
    { id: 'A', text: 'Kaum eine menschliche Fertigkeit ist so komplex wie die Sprachbeherrschung. In Sekundenbruchteilen analysiert unser Gehirn die Grammatik gehörter oder gelesener Sätze und ordnet die Wörter ihren Bedeutungen zu.', hint: 'Anfang: definiert das Thema (Sprachbeherrschung als komplexe Fertigkeit)' },
    { id: 'B', text: 'Auch beim Sprechen fasst das Gehirn rasend schnell die Sprechabsicht in Worte und Sätze und gibt die nötigen Anweisungen an die feinen Muskeln in Zunge und Mund weiter.', hint: '"Auch beim Sprechen" — fügt zweite Seite hinzu (nach Lesen)' },
    { id: 'C', text: 'Wie anfällig dieser komplizierte Prozess ist, erleben wir fast täglich: Zum Beispiel, wenn uns Worte nicht einfallen, wenn wir mitten im Satz ins Stocken geraten oder uns versprechen.', hint: '"dieser komplizierte Prozess" verweist zurück → Übergang zu Problemen' },
    { id: 'D', text: 'Treten Versprecher wie Buchstabendreher oder falsche Wörter häufig auf, sodass Gespräche zur Qual werden, dann liegt wahrscheinlich eine Sprach- oder Sprechstörung vor.', hint: '"Versprecher ... häufig" baut auf das Beispiel von vorher → Diagnose' },
    { id: 'E', text: 'Die möglichen Folgen: Angst vor Gesprächssituationen, berufliche Einschränkungen, Probleme beim Schreiben und Lesen, im schlimmsten Fall Vereinsamung. Zum Glück sind aber die meisten Sprach- und Sprechstörungen gut behandelbar.', hint: '"Die möglichen Folgen" — Konsequenzen → Schluss mit Hoffnung' },
  ]
};

// ======================================================
// LESEN Aufgabentyp 4 — Sprachhandlungen zuordnen (KI text)
// ======================================================
const SPEECH_ACTS_TASK = {
  title: 'Kommentar eines Experten zu Künstlicher Intelligenz',
  intro: 'Ordnen Sie die Textstellen [1]–[4] den Aussagen rechts zu.',
  passages: [
    { num: 1, text: 'Dass Maschinen jeden Tag produktiver werden und in vielen Berufszweigen mehr und mehr Aufgaben übernehmen, kann nicht mehr wegdiskutiert werden. [1] Die Sorge, dass mechanische Lösungen und Roboter den Menschen dadurch die Arbeitsplätze streitig machen, bleibt hingegen fragwürdig.', followingSentence: 'Die Sorge ... bleibt hingegen fragwürdig.', correctLetter: 'h', explain: 'Der Experte ZWEIFELT AN dieser Sorge — er sagt sie sei "fragwürdig".' },
    { num: 2, text: 'In Wirklichkeit ist es so, dass für die Betriebe ... eine Ära des Wachstums, höherer Mitarbeitermotivation und -zufriedenheit sowie geringerer Kosten eingeläutet wird. [2] Ein zukünftiges Szenario ist, dass KI die monotonen und routinemäßigen Aufgaben übernehmen wird ... Dadurch werden Arbeitsplätze erhalten und neue geschaffen, anstatt sie zu vernichten.', followingSentence: 'Ein zukünftiges Szenario ist, dass KI ...', correctLetter: 'e', explain: 'Der Experte PROGNOSTIZIERT etwas — "zukünftiges Szenario" ist eine Vorhersage.' },
    { num: 3, text: '[3] Viele Diskussionen über den Einsatz von KI befassen sich gegenwärtig mit den Vorteilen und Nachteilen, den Risiken und der Ethik, und das ist gut so.', followingSentence: 'Viele Diskussionen ... und das ist gut so.', correctLetter: 'b', explain: 'Der Experte BEGRÜSST etwas — "das ist gut so" = positive Bewertung.' },
    { num: 4, text: '[4] Vor diesem Hintergrund ist es besonders wichtig, jeden Anwendungsbereich gezielt zu untersuchen und zu bewerten, um die Vorteile wirklich realisieren und die Risiken und Bedenken minimieren zu können.', followingSentence: 'Vor diesem Hintergrund ist es besonders wichtig, jeden Anwendungsbereich gezielt zu untersuchen ...', correctLetter: 'c', explain: 'Der Experte EMPFIEHLT etwas — "es ist wichtig, ... zu untersuchen" = Empfehlung.' },
  ],
  options: [
    { letter: 'a', text: 'Der Experte bedauert etwas.' },
    { letter: 'b', text: 'Der Experte begrüßt etwas.' },
    { letter: 'c', text: 'Der Experte empfiehlt etwas.' },
    { letter: 'd', text: 'Der Experte kritisiert etwas.' },
    { letter: 'e', text: 'Der Experte prognostiziert etwas.' },
    { letter: 'f', text: 'Der Experte vermutet etwas.' },
    { letter: 'g', text: 'Der Experte warnt vor etwas.' },
    { letter: 'h', text: 'Der Experte zweifelt an etwas.' },
  ]
};

// ======================================================
// HÖREN Multiple-Choice (Mehrsprachigkeit)
// ======================================================
const MC_LISTENING = [
  {
    q: 'Mehrsprachigkeit ist laut der Sprecherin ...',
    options: ['besonders in Deutschland stark verbreitet.', 'das Lernen mehrerer Sprachen von Geburt an.', 'oft mit falschen Vorstellungen verbunden.', 'weltweit nur wenig verbreitet.'],
    correct: 2,
    explain: 'Die Sprecherin spricht über häufige Missverständnisse — "falsche Vorstellungen". Andere Antworten widersprechen dem Vortrag.'
  },
  {
    q: 'Ältere Menschen in Deutschland sprechen häufig ...',
    options: ['mehrere Sprachen mittelmäßig gut.', 'mehrere Sprachen wie eine Muttersprache.', 'weniger Sprachen als der weltweite Durchschnitt.', 'weniger Sprachen als Menschen in Großbritannien.'],
    correct: 3,
    explain: 'Vergleich Deutschland-Großbritannien: Deutsche Senioren sprechen WENIGER Sprachen als britische.'
  },
  {
    q: 'Alle Teilnehmenden der Untersuchung in Berlin ...',
    options: ['hatten Türkisch schon als Baby gelernt.', 'sprachen besser Türkisch als Deutsch.', 'waren in der Türkei geboren.', 'waren Kinder im Alter von 6–7 Jahren.'],
    correct: 1,
    explain: 'Die Berliner Untersuchung untersuchte Kinder, die Türkisch besser als Deutsch sprachen — alle waren bilingual aufgewachsen.'
  },
  {
    q: 'Als Resultat der Untersuchung ...',
    options: ['empfiehlt die Sprecherin, Sprachen früher zu lehren.', 'hebt die Sprecherin die Vorteile von bilingualer Erziehung hervor.', 'kritisiert die Sprecherin den üblichen Sprachunterricht in Schulen.', 'warnt die Sprecherin davor, bilinguale Erziehung zu spät zu beginnen.'],
    correct: 1,
    explain: 'Die Studie zeigte Vorteile der zweisprachigen Erziehung — die Sprecherin hebt diese hervor.'
  },
  {
    q: 'Das Hauptziel des Vortrags besteht darin, ...',
    options: ['den Nutzen von Mehrsprachigkeit infrage zu stellen.', 'den Umgang mit Mehrsprachigkeit zu kritisieren.', 'falsche Meinungen über Mehrsprachigkeit richtigzustellen.', 'von den Vorteilen von Mehrsprachigkeit zu überzeugen.'],
    correct: 0,
    explain: 'KORREKT laut Lösungsschlüssel: a). Der Vortrag stellt den Nutzen kritisch infrage — bringt verschiedene Perspektiven ein.'
  },
];

// ======================================================
// SCHREIBEN — Argumentative essay scaffolding
// ======================================================
const WRITING_TASK_1 = {
  thema: 'Berufliche Mobilität',
  prompt: 'Auf einer Lernplattform diskutieren Sie mit Ihrem Dozenten und anderen Seminarteilnehmenden über das Thema „Berufliche Mobilität". Erläutern und begründen Sie, welche positiven und negativen Aspekte es für Arbeitskräfte und Unternehmen haben kann, wenn Menschen oft ihre Arbeitsstelle wechseln.',
  minWords: 200,
  duration: 30,
  ideenPositiv: {
    arbeitskraefte: ['viele Erfahrungen in unterschiedlichen Firmen sammeln', 'bereichert die Berufserfahrungen', 'fördert die Karriere'],
    unternehmen: ['neue Mitarbeitende sind oft motiviert und engagiert', 'bringen wertvolle Erfahrungen mit']
  },
  ideenNegativ: {
    arbeitskraefte: ['kann Stress verursachen, weil man sich immer wieder neu einarbeiten muss', 'schwierig, wenn man Familie hat und vielleicht den Wohnort wechseln muss'],
    unternehmen: ['Einarbeitung der neuen Mitarbeitenden bedeutet viel Aufwand und kostet Zeit']
  },
  templatePhrases: [
    'In den letzten Jahren wird oft darüber diskutiert, ob ...',
    'Auf der einen Seite hat es viele Vorteile, ...',
    'Auf der anderen Seite gibt es jedoch auch Nachteile.',
    'Ein wichtiger Vorteil ist, dass ...',
    'Allerdings darf man nicht vergessen, dass ...',
    'Außerdem führt das oft dazu, dass ...',
    'Zusammenfassend lässt sich sagen, dass ...',
    'Meiner Meinung nach überwiegen die Vorteile / Nachteile, weil ...'
  ]
};

// ======================================================
// SPRECHEN tasks scaffolding
// ======================================================
const SPEAKING_TASKS = [
  { typ: 1, title: 'Rat geben', sit: 'Private Kommunikationssituation (Cafeteria, Mensa)', zeit: '0:45 Min', tipps: ['Direkt einen klaren Rat formulieren ("Ich würde dir empfehlen ...")', 'Begründung anhängen ("...weil...")', 'Persönlich und freundlich klingen'] },
  { typ: 2, title: 'Optionen abwägen', sit: 'Private Situation', zeit: '1:30 Min', tipps: ['Beide Optionen kurz nennen', 'Vor- und Nachteile gegenüberstellen', 'Klar Stellung beziehen am Ende'] },
  { typ: 3, title: 'Text zusammenfassen', sit: 'Studentische Arbeitsgruppe', zeit: '2:00 Min', tipps: ['Hauptthema nennen ("Im Text geht es um ...")', 'Wichtigste Punkte logisch ordnen', 'Konnektoren benutzen (zunächst, außerdem, schließlich)'] },
  { typ: 4, title: 'Informationen abgleichen, Stellung nehmen', sit: 'Fachgespräch im Seminar', zeit: '1:30 Min', tipps: ['Daten aus Grafik beschreiben', 'Vergleichen ("im Gegensatz zu ...")', 'Eigene Position kurz begründen'] },
  { typ: 5, title: 'Thema präsentieren', sit: 'Tutorium / Propädeutikum', zeit: '2:30 Min', tipps: ['Aufbau ankündigen ("Ich gehe auf drei Punkte ein...")', 'Auf jeden Gliederungspunkt eingehen', 'Wichtige Einzelheiten hervorheben'] },
  { typ: 6, title: 'Argumente wiedergeben, Stellung nehmen', sit: 'Fachgespräch / Seminar', zeit: '2:00 Min', tipps: ['Argumente des Kommilitonen wiedergeben', 'Zu jedem Argument Stellung nehmen', 'Eigenen Standpunkt begründen'] },
  { typ: 7, title: 'Maßnahmen kritisieren', sit: 'Diskussions-/Informationsveranstaltung', zeit: '1:30 Min', tipps: ['Konkrete Kritik formulieren ("Das ist problematisch, weil ...")', 'Alternative Lösungen vorschlagen', 'Höflich aber bestimmt bleiben'] },
];

// ======================================================
// EXAM STRUCTURE OVERVIEW
// ======================================================
const EXAM_STRUCTURE = {
  Lesen: [
    { typ: 1, name: 'Lückentext ergänzen', items: 5, time: '4 Min', tip: 'Im Kontext lesen — die richtige Wahl hängt oft von Kollokationen ab.' },
    { typ: 2, name: 'Textabschnitte ordnen', items: 4, time: '5 Min', tip: 'Achten Sie auf Verbindungswörter ("dieser", "auch", "hingegen").' },
    { typ: 3, name: 'Multiple-Choice', items: 7, time: '~10 Min', tip: 'Fragen ZUERST lesen, dann gezielt im Text suchen.' },
    { typ: 4, name: 'Sprachhandlungen zuordnen', items: 4, time: '6 Min', tip: 'Achten Sie auf den Satz NACH der Markierung — er beschreibt die Sprachhandlung.' },
    { typ: 5, name: 'Aussagen Kategorien zuordnen', items: 7, time: '~8 Min', tip: 'Wenn unsicher — "passt nicht" ist eine echte Option!' },
    { typ: 6, name: 'Aussagen einem Begriffspaar zuordnen', items: 4, time: '~6 Min', tip: 'Zuerst beide Begriffe definieren, dann zuordnen.' },
    { typ: 7, name: 'Fehler in Zusammenfassung erkennen', items: 3, time: '~7 Min', tip: 'Die Zusammenfassung präzise mit dem Originaltext vergleichen.' },
  ],
  Hören: [
    { typ: 1, name: 'Übersicht ergänzen', items: 5, format: 'Audio', tip: 'Kurz: max. 2 Wörter pro Feld!' },
    { typ: 2, name: 'Forderung & Argument notieren', items: 4, format: 'Audio', tip: 'Stichpunkte reichen — keine ganzen Sätze.' },
    { typ: 3, name: 'Fehler in Zusammenfassung erkennen', items: 2, format: 'Audio', tip: 'Sätze markieren, die NICHT mit Hörtext übereinstimmen.' },
    { typ: 4, name: 'Aussagen Personen zuordnen', items: 6, format: 'Video', tip: 'Auf Stimmen UND Gesichter achten.' },
    { typ: 5, name: 'Gliederungspunkte zu Vortrag', items: 4, format: 'Video', tip: 'Folgen Sie der Struktur des Vortrags.' },
    { typ: 6, name: 'Multiple-Choice', items: 5, format: 'Audio', tip: 'Die Reihenfolge der Fragen entspricht meist dem Hörtext.' },
    { typ: 7, name: 'Laut- und Schriftbild abgleichen', items: 4, format: 'Audio', tip: '4 Wörter sind anders — aufmerksam mitlesen!' },
  ],
  Schreiben: [
    { typ: 1, name: 'Argumentativen Text schreiben', umfang: 'min. 200 Wörter', time: '30 Min', tip: 'Pro & Kontra ausgewogen darstellen + eigene Meinung.' },
    { typ: 2, name: 'Lesetext und Grafik zusammenfassen', umfang: 'ca. 100–150 Wörter', time: '~30 Min', tip: 'Hauptinformationen aus BEIDEN Quellen — nicht abschreiben!' },
  ],
  Sprechen: SPEAKING_TASKS.map(t => ({ typ: t.typ, name: t.title, sit: t.sit, zeit: t.zeit }))
};

// ======================================================
// TIPS — for memory-friendly learning
// ======================================================
const MEMORY_TIPS = [
  { icon: '🧠', title: 'Spaced Repetition', text: 'Lerne 5–10 Wörter am Tag. Wiederhole NACH 1 Tag, 3 Tagen, 7 Tagen. Das Hirn vergisst weniger.' },
  { icon: '📖', title: 'Wörter in Sätzen', text: 'Lerne nie isolierte Wörter — immer in einem Beispielsatz. Kontext = besseres Gedächtnis.' },
  { icon: '🔗', title: 'Verknüpfungen schaffen', text: 'Verbinde neue Wörter mit Bildern, Geschichten oder Wörtern, die du schon kennst. "begeistert sich" → "geist" = ghost = passion lifts you.' },
  { icon: '✍️', title: 'Aktiv benutzen', text: 'Schreibe einen Satz mit jedem neuen Wort. Lesen reicht nicht. Schreiben festigt 3× stärker.' },
  { icon: '👂', title: 'Hörverstehen täglich', text: 'Höre 15 Min/Tag deutsches Audio (Tagesschau, Podcasts). Dein Ohr braucht Training.' },
  { icon: '⏱️', title: 'Mit Timer üben', text: 'Übe IMMER unter Zeitdruck. TestDaF ist eine Zeitprüfung — Vorbereitung muss das simulieren.' },
];

// ======================================================
// MAIN APP
// ======================================================
export default function App() {
  const [view, setView] = useState('home');
  const [progress, setProgress] = useState({ words: 0, tasks: 0, streak: 0 });

  const updateProgress = (key, delta = 1) => {
    setProgress(p => ({ ...p, [key]: p[key] + delta }));
  };

  return (
    <div className="min-h-screen w-full" style={{ background: 'radial-gradient(ellipse at top, #1a1f3a 0%, #0a0e1f 50%, #050714 100%)', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .display { font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        @keyframes pulse-glow { 0%,100% { opacity: 0.5 } 50% { opacity: 1 } }
        @keyframes slideUp { from { opacity:0; transform: translateY(20px) } to { opacity:1; transform: translateY(0) } }
        .anim-up { animation: slideUp 0.5s ease-out forwards }
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
        .glass-strong { background: rgba(255,255,255,0.06); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
        .glow-primary { box-shadow: 0 0 40px -10px rgba(124,156,255,0.4) }
        .glow-success { box-shadow: 0 0 40px -10px rgba(34,197,94,0.5) }
        .glow-error { box-shadow: 0 0 40px -10px rgba(239,68,68,0.5) }
        .gradient-text { background: linear-gradient(135deg, #c4ccff 0%, #7c9cff 50%, #5b7fff 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .grid-bg { background-image: linear-gradient(rgba(124,156,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,156,255,0.06) 1px, transparent 1px); background-size: 48px 48px; }
        .scroll-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scroll-thin::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .scroll-thin::-webkit-scrollbar-thumb { background: rgba(124,156,255,0.3); border-radius: 3px; }
        button { transition: all 0.2s ease; }
        button:active { transform: scale(0.97); }
      `}</style>

      <div className="grid-bg fixed inset-0 pointer-events-none opacity-50" />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(124,156,255,0.08) 0%, transparent 40%), radial-gradient(circle at 10% 80%, rgba(180,124,255,0.06) 0%, transparent 40%)' }} />

      <Header view={view} setView={setView} progress={progress} />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {view === 'home' && <Home setView={setView} progress={progress} />}
        {view === 'overview' && <Overview />}
        {view === 'vocab' && <VocabHub onWordLearned={() => updateProgress('words')} />}
        {view === 'lesen' && <LesenHub onTaskDone={() => updateProgress('tasks')} />}
        {view === 'hoeren' && <HoerenHub onTaskDone={() => updateProgress('tasks')} />}
        {view === 'schreiben' && <SchreibenHub />}
        {view === 'sprechen' && <SprechenHub />}
        {view === 'tipps' && <TippsView />}
      </main>

      <footer className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
        <div className="border-t border-white/5 pt-8 text-center text-xs text-white/40">
          <p>Made for Ekaterina · TestDaF Vorbereitung · Built from your project materials</p>
          <p className="mt-2 mono">Spaced repetition · Active recall · Context learning</p>
        </div>
      </footer>
    </div>
  );
}

// ============== HEADER ==============
function Header({ view, setView, progress }) {
  const navItems = [
    { id: 'home', label: 'Start', icon: Sparkles },
    { id: 'overview', label: 'Überblick', icon: Target },
    { id: 'vocab', label: 'Vokabeln', icon: Brain },
    { id: 'lesen', label: 'Lesen', icon: BookOpen },
    { id: 'hoeren', label: 'Hören', icon: Headphones },
    { id: 'schreiben', label: 'Schreiben', icon: PenTool },
    { id: 'sprechen', label: 'Sprechen', icon: Mic },
    { id: 'tipps', label: 'Tipps', icon: Lightbulb },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050714]/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setView('home')} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5b7fff 0%, #b47cff 100%)' }}>
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <div className="display font-bold text-white text-lg leading-tight">TestDaF</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mono">Studio · Ekaterina</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button key={item.id} onClick={() => setView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}>
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <Stat icon={Brain} val={progress.words} label="Wörter" />
              <Stat icon={Trophy} val={progress.tasks} label="Aufgaben" />
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden flex gap-1 overflow-x-auto scroll-thin pb-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  active ? 'text-white bg-white/10' : 'text-white/60'
                }`}>
                <Icon size={12} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function Stat({ icon: Icon, val, label }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
      <Icon size={12} className="text-white/60" />
      <span className="mono font-semibold text-white">{val}</span>
      <span className="text-white/40">{label}</span>
    </div>
  );
}

// ============== HOME ==============
function Home({ setView, progress }) {
  const cards = [
    { id: 'vocab', icon: Brain, title: 'Vokabeltrainer', desc: 'Deine eigenen Wörter aus dem Studium — Karteikarten, Quiz & Spiel', color: 'from-cyan-400 to-blue-500', count: VOCAB.length + ' Wörter' },
    { id: 'lesen', icon: BookOpen, title: 'Lesen', desc: 'Alle 7 Aufgabentypen: Lückentext, Reihenfolge, Multiple-Choice & mehr', color: 'from-violet-400 to-purple-600', count: '7 Übungen' },
    { id: 'hoeren', icon: Headphones, title: 'Hören', desc: 'Multiple-Choice & Verständnisfragen mit Erklärungen', color: 'from-fuchsia-400 to-pink-600', count: '5 Quizze' },
    { id: 'schreiben', icon: PenTool, title: 'Schreiben', desc: 'Aufsatz-Strukturen, Redemittel & Wörterzähler-Übung', color: 'from-amber-400 to-orange-600', count: '2 Aufgabentypen' },
    { id: 'sprechen', icon: Mic, title: 'Sprechen', desc: 'Alle 7 Aufgabentypen mit Strategien und Beispielen', color: 'from-emerald-400 to-teal-600', count: '7 Szenarien' },
    { id: 'tipps', icon: Lightbulb, title: 'Lerntechniken', desc: 'Wie du dir alles merkst — auch mit schlechtem Gedächtnis', color: 'from-rose-400 to-red-500', count: '6 Strategien' },
  ];

  return (
    <div className="anim-up">
      {/* Hero */}
      <section className="pt-16 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'pulse-glow 2s infinite' }} />
            <span className="text-xs mono uppercase tracking-wider text-white/70">Personal · Interactive · Built from your project</span>
          </div>
          <h1 className="display text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.95]">
            Bestehe den<br />
            <span className="gradient-text italic">digitalen TestDaF</span>
          </h1>
          <p className="mt-8 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Dein persönlicher Wortschatz aus dem Unterricht, die offiziellen Beispielaufgaben und gedächtnisfreundliche Lerntechniken — alles in einem klickbaren Studio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setView('vocab')} className="group px-6 py-3 rounded-xl font-semibold text-white glow-primary" style={{ background: 'linear-gradient(135deg, #5b7fff 0%, #b47cff 100%)' }}>
              <span className="flex items-center gap-2">Mit Vokabeln starten <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </button>
            <button onClick={() => setView('overview')} className="px-6 py-3 rounded-xl font-semibold text-white glass hover:bg-white/10">
              Prüfung verstehen
            </button>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mb-12">
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[
            { val: '4', label: 'Prüfungsteile' },
            { val: VOCAB.length, label: 'Deine Vokabeln' },
            { val: '20+', label: 'Übungen' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center">
              <div className="display text-4xl font-black text-white">{s.val}</div>
              <div className="text-xs uppercase tracking-wider text-white/50 mt-1 mono">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Module cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <button key={c.id} onClick={() => setView(c.id)} className="group relative overflow-hidden rounded-2xl glass p-6 text-left hover:bg-white/[0.07] transition-all" style={{ animation: `slideUp 0.6s ${i * 0.06}s both` }}>
              <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
              <div className="relative">
                <div className={`inline-flex w-11 h-11 rounded-xl items-center justify-center bg-gradient-to-br ${c.color} mb-4`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="display text-2xl font-bold text-white mb-1">{c.title}</div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">{c.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider mono text-white/40">{c.count}</span>
                  <ChevronRight size={14} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}

// ============== OVERVIEW ==============
function Overview() {
  const [tab, setTab] = useState('Lesen');
  const tabs = ['Lesen', 'Hören', 'Schreiben', 'Sprechen'];
  const colors = { Lesen: 'from-violet-400 to-purple-600', Hören: 'from-fuchsia-400 to-pink-600', Schreiben: 'from-amber-400 to-orange-600', Sprechen: 'from-emerald-400 to-teal-600' };
  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Was dich erwartet" title="Prüfungsstruktur" desc="Der digitale TestDaF besteht aus 4 Teilen mit insgesamt ~20 Aufgabentypen. Hier siehst du jeden einzelnen — was, wie viele Items und wie viel Zeit." />
      <div className="flex gap-2 mb-6 overflow-x-auto scroll-thin">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap ${tab === t ? `text-white bg-gradient-to-r ${colors[t]}` : 'text-white/60 glass'}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {EXAM_STRUCTURE[tab].map((task, i) => (
          <div key={i} className="glass rounded-2xl p-5 hover:bg-white/[0.07] transition-all" style={{ animation: `slideUp 0.4s ${i * 0.05}s both` }}>
            <div className="flex items-start gap-4">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mono font-bold text-white bg-gradient-to-br ${colors[tab]}`}>{task.typ}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <h3 className="display text-xl font-bold text-white">{task.name}</h3>
                  <span className="text-xs mono text-white/40 uppercase tracking-wider">{task.items ? task.items + ' Items' : task.umfang || ''}</span>
                  {task.time && <span className="text-xs mono text-white/40">· {task.time}</span>}
                  {task.format && <span className="text-xs mono text-white/40">· {task.format}</span>}
                  {task.zeit && <span className="text-xs mono text-white/40">· {task.zeit}</span>}
                  {task.sit && <span className="text-xs mono text-white/40">· {task.sit}</span>}
                </div>
                {task.tip && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/20">
                    <Lightbulb size={14} className="text-yellow-300 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/80"><span className="text-yellow-300 font-semibold">Tipp:</span> {task.tip}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="text-xs mono uppercase tracking-[0.3em] text-white/50 mb-3">{eyebrow}</div>
      <h2 className="display text-4xl md:text-5xl font-black text-white leading-tight">{title}</h2>
      {desc && <p className="mt-4 text-white/60 leading-relaxed">{desc}</p>}
    </div>
  );
}

// ============== VOCAB HUB ==============
function VocabHub({ onWordLearned }) {
  const [mode, setMode] = useState('cards');
  const [filter, setFilter] = useState('Alle');
  const topics = ['Alle', ...Array.from(new Set(VOCAB.map(v => v.topic)))];
  const filtered = filter === 'Alle' ? VOCAB : VOCAB.filter(v => v.topic === filter);

  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Dein persönlicher Wortschatz" title="Vokabeltrainer" desc={`${VOCAB.length} Wörter aus deinen Hausaufgaben — kategorisiert, mit Beispielsätzen und 3 Lernmodi. Wähle einen Modus und ein Thema, um zu starten.`} />

      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'cards', label: 'Karteikarten', icon: BookOpen },
          { id: 'quiz', label: 'Quiz', icon: Target },
          { id: 'match', label: 'Memory-Match', icon: Brain },
          { id: 'list', label: 'Liste', icon: Eye },
        ].map(m => {
          const Icon = m.icon;
          const active = mode === m.id;
          return (
            <button key={m.id} onClick={() => setMode(m.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${active ? 'text-white' : 'text-white/60 glass'}`} style={active ? { background: 'linear-gradient(135deg, #5b7fff 0%, #b47cff 100%)' } : {}}>
              <Icon size={14} />{m.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8">
        {topics.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1 rounded-full text-xs font-medium ${filter === t ? 'bg-white/15 text-white' : 'text-white/50 glass hover:text-white/80'}`}>
            {t} <span className="opacity-50 mono ml-1">{t === 'Alle' ? VOCAB.length : VOCAB.filter(v => v.topic === t).length}</span>
          </button>
        ))}
      </div>

      {mode === 'cards' && <Flashcards words={filtered} onLearn={onWordLearned} />}
      {mode === 'quiz' && <VocabQuiz words={filtered} onLearn={onWordLearned} />}
      {mode === 'match' && <MemoryMatch words={filtered} />}
      {mode === 'list' && <VocabList words={filtered} />}
    </div>
  );
}

function Flashcards({ words, onLearn }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  
  useEffect(() => { setIdx(0); setFlipped(false); }, [words]);

  if (words.length === 0) return <Empty />;
  const w = words[idx];

  const next = () => { setFlipped(false); setIdx(i => (i + 1) % words.length); };
  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + words.length) % words.length); };
  const markKnown = () => {
    if (!known.has(idx)) { onLearn?.(); setKnown(new Set([...known, idx])); }
    next();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-white/60">
        <span className="mono">{idx + 1} / {words.length}</span>
        <span>Bekannt: <span className="text-emerald-400 mono font-semibold">{known.size}</span></span>
      </div>

      <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-6">
        <div className="h-full" style={{ width: `${((idx + 1) / words.length) * 100}%`, background: 'linear-gradient(90deg, #5b7fff, #b47cff)', transition: 'width 0.4s' }} />
      </div>

      <button onClick={() => setFlipped(!flipped)} className="w-full text-left">
        <div className="glass-strong rounded-3xl p-10 min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer" style={{ background: flipped ? 'linear-gradient(135deg, rgba(91,127,255,0.1), rgba(180,124,255,0.1))' : 'rgba(255,255,255,0.04)' }}>
          <div className="absolute top-4 right-4 text-[10px] mono uppercase tracking-wider text-white/40">{w.topic} · Stufe {w.difficulty}</div>
          <div className="absolute top-4 left-4 text-[10px] mono uppercase tracking-wider text-white/40">{flipped ? 'Bedeutung' : 'Wort'}</div>
          {!flipped ? (
            <div className="text-center">
              <div className="display text-5xl md:text-6xl font-black text-white">{w.de}</div>
              <div className="mt-6 text-xs text-white/40 mono uppercase tracking-wider">Klicke zum Aufdecken</div>
            </div>
          ) : (
            <div className="text-center anim-up">
              <div className="display text-3xl md:text-4xl font-bold gradient-text">{w.en}</div>
              <div className="mt-6 px-6 py-3 rounded-xl bg-white/5 border border-white/10 italic text-white/80 text-sm md:text-base">"{w.ex}"</div>
            </div>
          )}
        </div>
      </button>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <button onClick={prev} className="glass py-3 rounded-xl text-white/70 hover:text-white flex items-center justify-center gap-1.5"><ArrowLeft size={14} />Zurück</button>
        <button onClick={() => setFlipped(!flipped)} className="glass py-3 rounded-xl text-white/70 hover:text-white flex items-center justify-center gap-1.5">
          {flipped ? <><EyeOff size={14} />Zudecken</> : <><Eye size={14} />Aufdecken</>}
        </button>
        <button onClick={next} className="glass py-3 rounded-xl text-white/70 hover:text-white flex items-center justify-center gap-1.5">Nächstes<ArrowRight size={14} /></button>
      </div>
      <button onClick={markKnown} className="mt-3 w-full py-3 rounded-xl font-semibold text-white glow-success" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
        ✓ Ich kann es! Weiter
      </button>
    </div>
  );
}

function VocabQuiz({ words, onLearn }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  
  useEffect(() => { setIdx(0); setPicked(null); setScore({ correct: 0, total: 0 }); }, [words]);
  if (words.length < 4) return <div className="glass rounded-2xl p-8 text-center text-white/60">Brauche mindestens 4 Wörter — wähle eine andere Kategorie.</div>;

  const w = words[idx];
  const distractors = useMemo(() => {
    const pool = words.filter((_, i) => i !== idx);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled.map(d => d.en), w.en].sort(() => Math.random() - 0.5);
  }, [idx, words]);

  const pick = (opt) => {
    if (picked !== null) return;
    setPicked(opt);
    const correct = opt === w.en;
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (correct) onLearn?.();
  };
  const next = () => { setPicked(null); setIdx(i => (i + 1) % words.length); };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="mono text-white/60">Frage {idx + 1} / {words.length}</span>
        <span className="text-white/60">Score: <span className="mono font-bold text-emerald-400">{score.correct}/{score.total}</span></span>
      </div>
      <div className="glass-strong rounded-3xl p-8">
        <div className="text-xs mono uppercase tracking-wider text-white/40 mb-2">Was bedeutet ...</div>
        <div className="display text-4xl md:text-5xl font-black text-white mb-1">{w.de}</div>
        <div className="text-xs text-white/40 italic mb-6">"{w.ex}"</div>
        <div className="space-y-2">
          {distractors.map((opt, i) => {
            const isCorrect = opt === w.en;
            const isPicked = opt === picked;
            let cls = 'border-white/10 hover:bg-white/5 text-white/80';
            if (picked !== null) {
              if (isCorrect) cls = 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200 glow-success';
              else if (isPicked) cls = 'border-rose-400/50 bg-rose-400/10 text-rose-200 glow-error';
              else cls = 'border-white/5 text-white/30';
            }
            return (
              <button key={i} onClick={() => pick(opt)} disabled={picked !== null} className={`w-full text-left p-4 rounded-xl border-2 ${cls} flex items-center justify-between`}>
                <span>{opt}</span>
                {picked !== null && isCorrect && <Check size={18} />}
                {picked !== null && isPicked && !isCorrect && <X size={18} />}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <button onClick={next} className="mt-6 w-full py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #5b7fff 0%, #b47cff 100%)' }}>
            Weiter <ArrowRight size={14} className="inline" />
          </button>
        )}
      </div>
    </div>
  );
}

function MemoryMatch({ words }) {
  const [pairs, setPairs] = useState([]);
  const [picked, setPicked] = useState([]);
  const [matched, setMatched] = useState(new Set());

  useEffect(() => {
    const sample = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    const cards = sample.flatMap((w, i) => [
      { id: `${i}-de`, side: 'de', text: w.de, pair: i },
      { id: `${i}-en`, side: 'en', text: w.en, pair: i },
    ]).sort(() => Math.random() - 0.5);
    setPairs(cards);
    setPicked([]);
    setMatched(new Set());
  }, [words]);

  const onClick = (card) => {
    if (matched.has(card.pair) || picked.find(p => p.id === card.id) || picked.length === 2) return;
    const next = [...picked, card];
    setPicked(next);
    if (next.length === 2) {
      if (next[0].pair === next[1].pair) {
        setTimeout(() => { setMatched(m => new Set([...m, next[0].pair])); setPicked([]); }, 600);
      } else {
        setTimeout(() => setPicked([]), 1100);
      }
    }
  };

  if (pairs.length === 0) return <Empty />;
  const done = matched.size === pairs.length / 2;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-4 text-white/60 text-sm">
        Klicke ein deutsches Wort und seine englische Bedeutung — finde alle Paare!
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {pairs.map(c => {
          const isPicked = picked.find(p => p.id === c.id);
          const isMatched = matched.has(c.pair);
          const show = isPicked || isMatched;
          return (
            <button key={c.id} onClick={() => onClick(c)} disabled={isMatched}
              className={`aspect-[3/2] rounded-xl border-2 flex items-center justify-center text-center p-2 text-xs md:text-sm font-semibold transition-all ${
                isMatched ? 'opacity-30 border-emerald-400/30 bg-emerald-400/5' : 
                show ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-transparent hover:border-white/20'
              }`}>
              {show ? c.text : <span className="text-white/40 mono">?</span>}
            </button>
          );
        })}
      </div>
      {done && (
        <div className="mt-6 glass rounded-2xl p-6 text-center anim-up">
          <Trophy className="mx-auto mb-2 text-yellow-400" size={36} />
          <div className="display text-2xl font-bold text-white">Geschafft!</div>
          <button onClick={() => {
            const sample = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
            const cards = sample.flatMap((w, i) => [
              { id: `${i}-de`, side: 'de', text: w.de, pair: i },
              { id: `${i}-en`, side: 'en', text: w.en, pair: i },
            ]).sort(() => Math.random() - 0.5);
            setPairs(cards); setPicked([]); setMatched(new Set());
          }} className="mt-4 px-6 py-2.5 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #5b7fff 0%, #b47cff 100%)' }}>Neues Spiel</button>
        </div>
      )}
    </div>
  );
}

function VocabList({ words }) {
  const [search, setSearch] = useState('');
  const filtered = words.filter(w => 
    w.de.toLowerCase().includes(search.toLowerCase()) || 
    w.en.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-3xl mx-auto">
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Suche Wort oder Bedeutung..." className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/40 mb-4 focus:outline-none focus:border-white/30" />
      <div className="space-y-2 max-h-[60vh] overflow-y-auto scroll-thin pr-2">
        {filtered.map((w, i) => (
          <div key={i} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="display font-bold text-white text-lg leading-tight">{w.de}</div>
              <div className="text-sm text-white/60">{w.en}</div>
              <div className="text-xs text-white/40 italic mt-1 truncate">"{w.ex}"</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] mono uppercase tracking-wider text-white/40">{w.topic}</div>
              <div className="flex gap-0.5 mt-1 justify-end">
                {[1,2,3,4].map(s => <span key={s} className={`w-1 h-3 rounded-sm ${s <= w.difficulty ? 'bg-amber-400/60' : 'bg-white/10'}`} />)}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <Empty />}
      </div>
    </div>
  );
}

function Empty() {
  return <div className="glass rounded-2xl p-8 text-center text-white/50">Nichts gefunden.</div>;
}

// ============== LESEN ==============
function LesenHub({ onTaskDone }) {
  const [task, setTask] = useState('cloze');
  const tasks = [
    { id: 'cloze', label: 'Lückentext', icon: '①' },
    { id: 'order', label: 'Reihenfolge', icon: '②' },
    { id: 'speech', label: 'Sprachhandlungen', icon: '④' },
  ];
  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Prüfungsteil 1" title="Lesen" desc="Drei interaktive Übungen aus den offiziellen Beispielaufgaben. Klicke, ordne, kombiniere — und sieh sofort, warum eine Antwort richtig ist." />
      <div className="flex flex-wrap gap-2 mb-8">
        {tasks.map(t => (
          <button key={t.id} onClick={() => setTask(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${task === t.id ? 'text-white' : 'text-white/60 glass'}`} style={task === t.id ? { background: 'linear-gradient(135deg, #8b5cf6, #d946ef)' } : {}}>
            <span className="mono opacity-60">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      {task === 'cloze' && <ClozeTask onDone={onTaskDone} />}
      {task === 'order' && <OrderTask onDone={onTaskDone} />}
      {task === 'speech' && <SpeechActsTask onDone={onTaskDone} />}
    </div>
  );
}

function ClozeTask({ onDone }) {
  const [picks, setPicks] = useState({});
  const [show, setShow] = useState(false);
  const totalCorrect = CLOZE_TEXT.parts.filter((p, i) => picks[i] === p.correct).length;
  const allAnswered = Object.keys(picks).length === CLOZE_TEXT.parts.length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-strong rounded-3xl p-8">
        <div className="text-xs mono uppercase tracking-wider text-white/40 mb-2">Lesen · Aufgabentyp 1 · 4 Min</div>
        <h3 className="display text-2xl font-bold text-white mb-6">{CLOZE_TEXT.title}</h3>
        <div className="text-white/80 leading-relaxed text-base">
          {CLOZE_TEXT.intro}
          {CLOZE_TEXT.parts.map((p, i) => (
            <span key={i}>
              <ClozeGap part={p} idx={i} pick={picks[i]} setPick={(v) => setPicks({...picks, [i]: v})} show={show} />
              {p.text}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button onClick={() => setShow(!show)} disabled={!allAnswered} className="py-3 rounded-xl font-semibold text-white glass disabled:opacity-30 disabled:cursor-not-allowed">
          {show ? 'Lösungen verstecken' : `Auswerten (${Object.keys(picks).length}/5 ausgefüllt)`}
        </button>
        <button onClick={() => { setPicks({}); setShow(false); }} className="py-3 rounded-xl font-semibold glass text-white/70 flex items-center justify-center gap-2">
          <RotateCcw size={14} />Neu starten
        </button>
      </div>

      {show && (
        <div className="mt-6 anim-up">
          <div className="glass-strong rounded-2xl p-6 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="display text-2xl font-bold text-white">Ergebnis: <span className="gradient-text">{totalCorrect} / 5</span></div>
              {totalCorrect === 5 && <Trophy className="text-yellow-400" size={28} />}
            </div>
            {totalCorrect === 5 && <div className="text-sm text-emerald-400">Perfekt! 🎯 {(() => { onDone?.(); return null; })()}</div>}
          </div>
          {CLOZE_TEXT.parts.map((p, i) => {
            const correct = picks[i] === p.correct;
            return (
              <div key={i} className={`rounded-xl p-4 mb-2 border ${correct ? 'border-emerald-400/30 bg-emerald-400/5' : 'border-rose-400/30 bg-rose-400/5'}`}>
                <div className="flex items-start gap-3">
                  <span className="mono text-sm font-bold text-white/60 mt-0.5">[{p.gap}]</span>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="text-white/60">Richtige Antwort: </span>
                      <span className="text-emerald-300 font-bold">{p.options[p.correct]}</span>
                      {!correct && <><span className="text-white/40"> · Du: </span><span className="text-rose-300">{p.options[picks[i]]}</span></>}
                    </div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{p.explain}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ClozeGap({ part, idx, pick, setPick, show }) {
  const [open, setOpen] = useState(false);
  let cls = 'border-white/30 hover:border-white/60';
  if (show) {
    cls = pick === part.correct ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-rose-400 bg-rose-400/10 text-rose-200';
  } else if (pick !== undefined) {
    cls = 'border-violet-400 bg-violet-400/10 text-violet-200';
  }
  return (
    <span className="relative inline-block mx-1">
      <button onClick={() => !show && setOpen(!open)} className={`mono px-3 py-0.5 rounded-md border-2 border-dashed text-sm ${cls} transition-all`}>
        {pick !== undefined ? part.options[pick] : `[${part.gap}] _____`}
      </button>
      {open && !show && (
        <div className="absolute left-0 top-full mt-1 z-20 glass-strong rounded-xl p-2 min-w-[200px] shadow-2xl">
          {part.options.map((o, i) => (
            <button key={i} onClick={() => { setPick(i); setOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 mono">
              <span className="text-white/40 mr-2">{String.fromCharCode(97+i)})</span>{o}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

function OrderTask({ onDone }) {
  const [items, setItems] = useState(() => [...ORDER_TASK.correctOrder].sort(() => Math.random() - 0.5));
  const [show, setShow] = useState(false);
  const move = (from, to) => {
    if (to < 0 || to >= items.length) return;
    const arr = [...items]; const [x] = arr.splice(from, 1); arr.splice(to, 0, x); setItems(arr);
  };
  const isCorrect = items.every((it, i) => it.id === ORDER_TASK.correctOrder[i].id);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-strong rounded-3xl p-8 mb-4">
        <div className="text-xs mono uppercase tracking-wider text-white/40 mb-2">Lesen · Aufgabentyp 2 · 5 Min</div>
        <h3 className="display text-2xl font-bold text-white mb-2">{ORDER_TASK.title}</h3>
        <p className="text-sm text-white/60 mb-6">Bringe die Textabschnitte mit den ↑/↓ Pfeilen in die richtige Reihenfolge.</p>
        <div className="space-y-2">
          {items.map((it, i) => {
            const correct = show && it.id === ORDER_TASK.correctOrder[i].id;
            const wrong = show && !correct;
            return (
              <div key={it.id} className={`flex gap-3 items-start p-4 rounded-xl border ${correct ? 'border-emerald-400/40 bg-emerald-400/5' : wrong ? 'border-rose-400/40 bg-rose-400/5' : 'border-white/10 bg-white/[0.03]'}`}>
                <div className="shrink-0 flex flex-col gap-1">
                  <button onClick={() => move(i, i-1)} disabled={i===0 || show} className="w-7 h-7 rounded-md glass disabled:opacity-30 text-white/70 hover:text-white text-xs">▲</button>
                  <div className="text-center mono text-xs text-white/50 font-bold">{i+1}</div>
                  <button onClick={() => move(i, i+1)} disabled={i===items.length-1 || show} className="w-7 h-7 rounded-md glass disabled:opacity-30 text-white/70 hover:text-white text-xs">▼</button>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/80 leading-relaxed">{it.text}</p>
                  {show && <p className="mt-2 text-xs text-yellow-300/80 italic">💡 {it.hint}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => { setShow(true); if (isCorrect) onDone?.(); }} className="py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)' }}>Auswerten</button>
        <button onClick={() => { setItems([...ORDER_TASK.correctOrder].sort(() => Math.random() - 0.5)); setShow(false); }} className="py-3 rounded-xl font-semibold glass text-white/70 flex items-center justify-center gap-2"><RotateCcw size={14} />Mischen</button>
      </div>
      {show && isCorrect && (
        <div className="mt-4 glass rounded-2xl p-4 border-emerald-400/30 anim-up flex items-center gap-3 text-emerald-300">
          <Trophy size={20} /><span className="font-semibold">Perfekt! Du hast die richtige Reihenfolge gefunden.</span>
        </div>
      )}
    </div>
  );
}

function SpeechActsTask({ onDone }) {
  const [picks, setPicks] = useState({});
  const [show, setShow] = useState(false);
  const correct = SPEECH_ACTS_TASK.passages.filter(p => picks[p.num] === p.correctLetter).length;
  const all = Object.keys(picks).length === 4;
  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass-strong rounded-3xl p-8">
        <div className="text-xs mono uppercase tracking-wider text-white/40 mb-2">Lesen · Aufgabentyp 4 · 6 Min</div>
        <h3 className="display text-2xl font-bold text-white mb-2">{SPEECH_ACTS_TASK.title}</h3>
        <p className="text-sm text-white/60 mb-6">{SPEECH_ACTS_TASK.intro}</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {SPEECH_ACTS_TASK.passages.map(p => (
              <div key={p.num} className={`p-4 rounded-xl border ${show && picks[p.num] === p.correctLetter ? 'border-emerald-400/40 bg-emerald-400/5' : show ? 'border-rose-400/40 bg-rose-400/5' : 'border-white/10 bg-white/[0.03]'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="mono w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-sm font-bold text-white">{p.num}</span>
                  <span className="text-xs text-white/50">Folgender Satz:</span>
                </div>
                <p className="text-sm italic text-white/80">"{p.followingSentence}"</p>
                <div className="mt-3">
                  <select value={picks[p.num] || ''} onChange={(e) => setPicks({...picks, [p.num]: e.target.value})} disabled={show} className="w-full glass rounded-lg px-3 py-2 text-white text-sm focus:outline-none">
                    <option value="" disabled className="bg-slate-900">— wähle aus —</option>
                    {SPEECH_ACTS_TASK.options.map(o => <option key={o.letter} value={o.letter} className="bg-slate-900">[{o.letter}] {o.text}</option>)}
                  </select>
                </div>
                {show && (
                  <div className="mt-2 text-xs text-yellow-300/80 italic">💡 {p.explain}</div>
                )}
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-4 sticky top-20 self-start">
            <div className="text-xs uppercase mono tracking-wider text-white/50 mb-3">Sprachhandlungen</div>
            <div className="space-y-1.5">
              {SPEECH_ACTS_TASK.options.map(o => (
                <div key={o.letter} className="text-sm text-white/70 flex gap-2">
                  <span className="mono text-white/40">[{o.letter}]</span>
                  <span>{o.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={() => { setShow(true); if (correct === 4) onDone?.(); }} disabled={!all} className="py-3 rounded-xl font-semibold text-white disabled:opacity-30" style={{ background: 'linear-gradient(135deg, #8b5cf6, #d946ef)' }}>
          Auswerten {all && `(${correct}/4)`}
        </button>
        <button onClick={() => { setPicks({}); setShow(false); }} className="py-3 rounded-xl glass text-white/70 flex items-center justify-center gap-2 font-semibold"><RotateCcw size={14} />Neu</button>
      </div>
    </div>
  );
}

// ============== HÖREN ==============
function HoerenHub({ onTaskDone }) {
  const [picks, setPicks] = useState({});
  const [show, setShow] = useState({});
  const correct = MC_LISTENING.filter((q, i) => picks[i] === q.correct).length;
  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Prüfungsteil 2" title="Hören" desc='Multiple-Choice-Übung zum Originaltext "Mehrsprachigkeit". In der echten Prüfung hörst du den Vortrag — hier liest du die Fragen direkt und siehst nach jeder Antwort, warum sie richtig oder falsch ist.' />
      <div className="glass-strong rounded-3xl p-6 md:p-8 mb-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-fuchsia-400/5 border border-fuchsia-400/20">
          <Volume2 size={18} className="text-fuchsia-300 shrink-0" />
          <p className="text-xs text-white/70">Originalaudio findest du unter <span className="mono text-fuchsia-300">testdaf.de/de/teilnehmende</span> — Aufgabentyp 6.</p>
        </div>
        <div className="space-y-4">
          {MC_LISTENING.map((q, i) => {
            const isShown = show[i];
            return (
              <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mono w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-400 to-pink-600 flex items-center justify-center text-white text-sm font-bold shrink-0">{i+1}</div>
                  <h4 className="font-semibold text-white text-base">{q.q}</h4>
                </div>
                <div className="space-y-1.5 ml-10">
                  {q.options.map((opt, j) => {
                    const picked = picks[i] === j;
                    const isCorrect = j === q.correct;
                    let cls = 'text-white/70 hover:bg-white/5';
                    if (isShown) {
                      if (isCorrect) cls = 'bg-emerald-400/10 text-emerald-200 border-emerald-400/30';
                      else if (picked) cls = 'bg-rose-400/10 text-rose-200 border-rose-400/30';
                      else cls = 'text-white/30';
                    } else if (picked) cls = 'bg-white/10 text-white border-white/30';
                    return (
                      <button key={j} onClick={() => !isShown && setPicks({...picks, [i]: j})} className={`w-full text-left px-3 py-2 rounded-lg border border-transparent text-sm transition-all ${cls}`}>
                        <span className="mono text-xs opacity-50 mr-2">[{String.fromCharCode(97+j)}]</span>{opt}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 ml-10">
                  <button onClick={() => { setShow({...show, [i]: !isShown}); if (!isShown && picks[i] === q.correct) onTaskDone?.(); }} className="text-xs px-3 py-1 rounded-md glass text-white/70 hover:text-white" disabled={picks[i]===undefined}>
                    {isShown ? 'Verbergen' : 'Lösung'}
                  </button>
                  {isShown && (
                    <div className="mt-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/20 text-xs text-white/80 leading-relaxed">
                      <Lightbulb size={12} className="text-yellow-300 inline mr-1" />{q.explain}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="text-sm text-white/60">Score: <span className="mono text-emerald-300 font-bold">{correct}/{MC_LISTENING.length}</span></div>
          <button onClick={() => { setPicks({}); setShow({}); }} className="text-xs px-3 py-1.5 rounded-lg glass text-white/70 flex items-center gap-1.5"><RotateCcw size={12} />Neu</button>
        </div>
      </div>
    </div>
  );
}

// ============== SCHREIBEN ==============
function SchreibenHub() {
  const [text, setText] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const wc = text.trim().split(/\s+/).filter(Boolean).length;
  const t = WRITING_TASK_1;
  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Prüfungsteil 3" title="Schreiben" desc="Argumentativer Text — die häufigste Aufgabe. Hier siehst du das offizielle Beispielthema, eine Ideen-Sammlung, hilfreiche Redemittel und kannst direkt einen Aufsatz schreiben (mit Wörterzähler!)." />
      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-strong rounded-3xl p-6">
            <div className="text-xs mono uppercase tracking-wider text-white/40 mb-2">Aufgabentyp 1 · {t.duration} Min · min. {t.minWords} Wörter</div>
            <h3 className="display text-2xl font-bold text-white mb-3">{t.thema}</h3>
            <p className="text-sm text-white/70 leading-relaxed">{t.prompt}</p>
          </div>
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs mono uppercase tracking-wider text-white/40">Dein Aufsatz</div>
              <div className={`text-xs mono ${wc >= t.minWords ? 'text-emerald-400' : 'text-amber-400'}`}>{wc} / {t.minWords} Wörter</div>
            </div>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Beginne hier zu schreiben...&#10;&#10;Tipp: Einleitung → Pro → Kontra → Eigene Meinung → Schluss" className="w-full h-80 glass rounded-xl p-4 text-white text-sm leading-relaxed focus:outline-none resize-none" />
            <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full transition-all" style={{ width: `${Math.min(100, (wc/t.minWords)*100)}%`, background: wc >= t.minWords ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #f59e0b, #d97706)' }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-5">
            <div className="display font-bold text-white mb-3 flex items-center gap-2"><Lightbulb size={16} className="text-amber-400" />Ideen für Pro</div>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Für Arbeitskräfte</div>
            <ul className="space-y-1 text-sm text-white/70 mb-3">{t.ideenPositiv.arbeitskraefte.map((x,i) => <li key={i} className="flex gap-2"><span className="text-emerald-400">+</span>{x}</li>)}</ul>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Für Unternehmen</div>
            <ul className="space-y-1 text-sm text-white/70">{t.ideenPositiv.unternehmen.map((x,i) => <li key={i} className="flex gap-2"><span className="text-emerald-400">+</span>{x}</li>)}</ul>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <div className="display font-bold text-white mb-3">Ideen für Kontra</div>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Für Arbeitskräfte</div>
            <ul className="space-y-1 text-sm text-white/70 mb-3">{t.ideenNegativ.arbeitskraefte.map((x,i) => <li key={i} className="flex gap-2"><span className="text-rose-400">−</span>{x}</li>)}</ul>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Für Unternehmen</div>
            <ul className="space-y-1 text-sm text-white/70">{t.ideenNegativ.unternehmen.map((x,i) => <li key={i} className="flex gap-2"><span className="text-rose-400">−</span>{x}</li>)}</ul>
          </div>
          <div className="glass-strong rounded-2xl p-5">
            <div className="display font-bold text-white mb-3">Redemittel</div>
            <ul className="space-y-1.5 text-sm text-white/70">{t.templatePhrases.map((x,i) => <li key={i} className="italic">"{x}"</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== SPRECHEN ==============
function SprechenHub() {
  const [open, setOpen] = useState(0);
  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Prüfungsteil 4" title="Sprechen" desc="7 Aufgabentypen mit unterschiedlichen Situationen und Sprechzeiten. Klicke jede Karte, um Strategien und Redemittel zu sehen." />
      <div className="space-y-3 max-w-4xl mx-auto">
        {SPEAKING_TASKS.map((t, i) => (
          <div key={i} className="glass-strong rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.03]">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold mono">{t.typ}</div>
              <div className="flex-1 min-w-0">
                <div className="display font-bold text-white text-lg">{t.title}</div>
                <div className="text-xs text-white/50 mt-0.5">{t.sit} · <span className="mono">{t.zeit}</span></div>
              </div>
              <ChevronRight size={18} className={`text-white/40 transition-transform ${open === i ? 'rotate-90' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 anim-up">
                <div className="ml-16 p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/15">
                  <div className="text-xs uppercase mono tracking-wider text-emerald-300 mb-2">Strategie</div>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    {t.tipps.map((tip, j) => <li key={j} className="flex gap-2"><span className="text-emerald-400 shrink-0">→</span>{tip}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto mt-8 glass rounded-2xl p-6">
        <div className="display font-bold text-white mb-3 flex items-center gap-2"><Star size={16} className="text-yellow-400" />Wichtigste Sprechen-Redemittel</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Meinung äußern</div>
            <ul className="space-y-1 text-white/70 italic">
              <li>"Meiner Meinung nach ..."</li>
              <li>"Ich bin der Auffassung, dass ..."</li>
              <li>"Aus meiner Sicht ist es so, dass ..."</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Stellung nehmen</div>
            <ul className="space-y-1 text-white/70 italic">
              <li>"Da stimme ich (nicht) zu, weil ..."</li>
              <li>"Mein Kommilitone argumentiert, dass ..."</li>
              <li>"Allerdings muss man bedenken, dass ..."</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Empfehlen</div>
            <ul className="space-y-1 text-white/70 italic">
              <li>"Ich würde dir empfehlen, ... zu ..."</li>
              <li>"An deiner Stelle würde ich ..."</li>
              <li>"Du könntest ... versuchen."</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase mono tracking-wider text-white/40 mb-2">Strukturieren</div>
            <ul className="space-y-1 text-white/70 italic">
              <li>"Zunächst möchte ich ..."</li>
              <li>"Im nächsten Schritt ..."</li>
              <li>"Abschließend möchte ich betonen, dass ..."</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== TIPPS ==============
function TippsView() {
  return (
    <div className="anim-up py-12">
      <SectionTitle eyebrow="Lerntechniken" title="Wie du dir alles merkst" desc='Sechs evidenzbasierte Methoden — speziell für Lernende mit schlechtem Gedächtnis. Die Wahrheit: Niemand hat ein schlechtes Gedächtnis. Man hat nur die falschen Methoden.' />
      <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
        {MEMORY_TIPS.map((t, i) => (
          <div key={i} className="glass-strong rounded-2xl p-6 hover:bg-white/[0.07] transition-all" style={{ animation: `slideUp 0.5s ${i * 0.08}s both` }}>
            <div className="text-4xl mb-3">{t.icon}</div>
            <div className="display text-xl font-bold text-white mb-2">{t.title}</div>
            <p className="text-sm text-white/70 leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-4xl glass-strong rounded-3xl p-8">
        <div className="display text-2xl font-bold text-white mb-4 flex items-center gap-2"><Flame size={20} className="text-orange-400" />Mein 8-Wochen-Plan für dich</div>
        <div className="space-y-3">
          {[
            { w: 'Woche 1–2', f: 'Wortschatz-Grundlage', t: 'Täglich 10 neue Wörter aus dem Vokabel-Modul. Ziel: 100+ neue Wörter aktiv.' },
            { w: 'Woche 3–4', f: 'Lesen + Hören', t: 'Jeden Tag 1 Aufgabentyp aus Lesen ODER Hören. Original-Audios von testdaf.de hören.' },
            { w: 'Woche 5–6', f: 'Schreiben üben', t: '3× pro Woche einen Aufsatz schreiben (200 Wörter, 30 Min Timer). Redemittel auswendig.' },
            { w: 'Woche 7', f: 'Sprechen + Mock-Test', t: 'Sprechen täglich aufnehmen (Handy). Einen kompletten Mock-Test machen.' },
            { w: 'Woche 8', f: 'Schwächen polieren', t: 'Schwierigste Aufgabentypen wiederholen. Vokabeln, die du noch verwechselst, isolieren.' },
          ].map((p, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="shrink-0 w-24 mono text-xs uppercase tracking-wider text-violet-300 font-bold pt-1">{p.w}</div>
              <div className="flex-1">
                <div className="font-semibold text-white">{p.f}</div>
                <div className="text-sm text-white/60">{p.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-4xl glass rounded-2xl p-6 border-emerald-400/20">
        <div className="display text-xl font-bold text-white mb-3 flex items-center gap-2"><Award size={18} className="text-emerald-400" />Am Prüfungstag</div>
        <ul className="space-y-2 text-sm text-white/80">
          <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>8 Stunden schlafen — kein Cramming am letzten Abend.</li>
          <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Frühstücken (Eiweiß + Kohlenhydrate, kein zu viel Zucker).</li>
          <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>30 Min vor der Prüfung NICHT auf das Handy schauen — beruhigt das Hirn.</li>
          <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Bei jeder Aufgabe: ZUERST die Anleitung 2× lesen, dann lösen.</li>
          <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Du kannst NICHT zurückgehen — also ist erste Antwort meist die richtige.</li>
          <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span>Beim Schreiben: 5 Min planen → 20 Min schreiben → 5 Min korrigieren.</li>
        </ul>
      </div>
    </div>
  );
}
