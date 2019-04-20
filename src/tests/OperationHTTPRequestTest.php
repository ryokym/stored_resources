<?php
require_once(__DIR__.'/../app/lib/autoload.php');
use Operation\OperationHTTPRequest;

class OperationHTTPRequestTest extends \PHPUnit\Framework\TestCase
{
    private function getProparties(Object $Instance, array $props)
    {
        $reflection = new \ReflectionClass($Instance);
        foreach ($props as $propname => $param) {
            $property = $reflection->getProperty($propname);
            $property->setAccessible(true);
            $test[$propname] = $property->getValue($Instance);
        }
        return $test;
    }

    public function testGetActionType()
    {
        $operation = new OperationHTTPRequest();
        $operation->setActionType('change');
        $test = $operation->getActionType();

        $expected = 'change';
        $this->assertEquals($expected, $test);
    }

    /**
    * @dataProvider requestsProvider
    */
    public function testSetProparties($requests)
    {
        $test = [];
        $operation = new OperationHTTPRequest();
        $operation->setProparties($requests);
        $results = $this->getProparties($operation, $requests);
        $this->assertEquals($requests, $results);
    }

    public function requestsProvider()
    {
        return
        [
            [
                [
                    'dirname' => 'testdir'
                ],
                [
                    'dirname' => 'testdir',
                    'name'    => 'testname',
                    'level'   => 2,
                ]
            ]
        ];
    }

    /**
    * @dataProvider getValuesProvider
    */
    public function testGetValues($props)
    {
        $operation = new OperationHTTPRequest();
        $properties = $this->getProparties($operation, $props);
        $propnames = [];
        $params = [];
        foreach ($properties as $propname => $param) {
            $propnames[] = $propname;
            $params[] = $param;
        }
        $test = $operation->getValues($propnames);
        $this->assertEquals($test, $params);
    }

    public function getValuesProvider()
    {
        return
        [
            [
                [
                    'dirname' => 'testdir'
                ],
                [
                    'dirname' => 'testdir',
                    'name'    => 'testname',
                    'level'   => 2,
                ]
            ]
        ];
    }
}
