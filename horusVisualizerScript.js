const HorusVisualizer = require('@horustracer/visualizer');

require("dotenv").config();

HorusVisualizer.mapAveragesToNeo4jBrowser(process.env.HORUS_DB, 'bolt://localhost:11002', 'neo4j', 'password');

// HorusVisualizer.logAverages(process.env.HORUS_DB);