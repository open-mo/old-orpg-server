import { QuadTree, Box, Point } from 'js-quadtree';
import { Dictionary, Player } from "types/index";

class GameMap {
    index: number;
    players: Dictionary<Player> = {};
    quadtree: QuadTree;

    constructor(index: number, bounds: Box) {
        this.index = index;
        this.quadtree = new QuadTree(bounds);
    }

    removePlayer(player: Player) {
        this.quadtree.insert(new Point(player.position.x, player.position.y));
        delete this.players[player._id];
    }

    addPlayer(player: Player) {
        this.quadtree.insert(new Point(player.position.x, player.position.y, { ownerID: player._id }));
        this.players[player._id] = player;
    }

    getTile(point: Point) {
        const range: Box = new Box(point.x, point.y, 1, 1);
        return this.quadtree.query(range);
    }

    getIndex() {
        return this.index;
    }

}

export default GameMap;